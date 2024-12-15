import { 
  expenseRepository, 
  splitRepository, 
  balanceRepository, 
  balanceSheetRepository 
} from '../../repository/index.js';
import { Model } from '../../db/models/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

export const DeleteExpense = {
  process: async (params) => {
    const transaction = await sequelize.transaction();
    try {
      // Validate and fetch expense
      const expense = await expenseRepository.get({
        where: { expense_ulid: params.expense_id },
      });

      if (!expense) {
        throw new Http.NotFoundError('Expense not found');
      }

      // Fetch splits associated with the expense
      const splits = await splitRepository.findAll({
        where: { expense_id: expense.id },
        transaction,
      });

      if (!splits.length) {
        throw new Http.ConflictError('No splits found for this expense');
      }

      // Update balances and balance sheets for affected users
      for (const split of splits) {
        const balanceData = await balanceRepository.get({
          where: {
            user_id: split.owe_by_id,
            another_user_id: expense.paid_by_id,
          },
          transaction,
        });

        if (balanceData) {
          // Adjust balances
          const updatedLent = balanceData.lent_money - split.amount;
          const updatedOwe = balanceData.owe_money + split.amount;

          await balanceRepository.upsert(
            {
              user_id: split.owe_by_id,
              another_user_id: expense.paid_by_id,
              lent_money: Math.max(0, updatedLent),
              owe_money: Math.max(0, updatedOwe),
            },
            { transaction }
          );

          // Adjust the reverse relationship
          await balanceRepository.upsert(
            {
              user_id: expense.paid_by_id,
              another_user_id: split.owe_by_id,
              lent_money: Math.max(0, updatedOwe),
              owe_money: Math.max(0, updatedLent),
            },
            { transaction }
          );
        }

        // Update balance sheets
        const balanceSheet = await balanceSheetRepository.get({
          where: { user_id: split.owe_by_id },
          transaction,
        });

        if (balanceSheet) {
          const updatedSheet = {
            total_owe: Math.max(0, balanceSheet.total_owe - split.amount),
            total_lent: Math.max(0, balanceSheet.total_lent - split.amount),
            total_expense: Math.max(0, balanceSheet.total_expense - split.amount),
          };

          await balanceSheetRepository.update(updatedSheet, {
            where: { user_id: split.owe_by_id },
            transaction,
          });
        }
      }

      // Delete splits
      await splitRepository.destroy({
        where: { expense_id: expense.id },
        transaction,
      });

      // Delete expense
      await expenseRepository.delete({
        where: { expense_ulid: params.expense_id },
        transaction,
      });

      await transaction.commit();
      return { message: 'Expense deleted successfully' };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};
