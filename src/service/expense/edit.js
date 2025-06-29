import { groupRepository, expenseRepository, userRepository, splitRepository, balanceRepository, balanceSheetRepository } from '../../repository/index.js';

import { Model } from '../../db/models/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

function getLentMoney(lentMoney, oweMoney, entry) {
  if (!lentMoney && !oweMoney) return 0;
  const amount = lentMoney - oweMoney - entry.split_amount;
  return amount < 0 ? 0 : amount;
}

function getOweMoney(lentMoney, oweMoney, entry) {
  if (!lentMoney && !oweMoney) return entry.split_amount;
  const amount = oweMoney + entry.split_amount - lentMoney;
  return amount < 0 ? 0 : amount;
}

export const EditExpense = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      // Validate and fetch existing expense
      const expense = await expenseRepository.get({
        where: { expense_ulid: params.expense_id },
      });

      if (!expense) {
        throw new Http.NotFoundError('Expense not found');
      }

      const totalSplitAmount = params.split.reduce((sum, entry) => sum + entry.split_amount, 0);

      if (totalSplitAmount !== params.total_amount) {
        throw new Http.ConflictError('Split amount total does not match the total expense amount');
      }

      const group = await groupRepository.get({
        where: { uuid: params.group_uuid },
      });

      const userDetails = await userRepository.get({
        where: { ulid: params.user_id },
      });

      if (!group || !userDetails) {
        throw new Http.NotFoundError('User or group not found');
      }

      // Update expense details
      const updatedExpenseData = {
        title: params.title,
        desc: params.desc || '',
        amount: params.total_amount,
        group_id: group.group_id,
        paid_by_id: userDetails.id,
      };

      await expenseRepository.update(updatedExpenseData, { expense_ulid: params.expense_id }, { transaction });

      // Remove old splits
      await splitRepository.destroy({
        where: { expense_id: expense.id },
        transaction,
      });

      // Process new splits
      const splitData = [];

      for (const entry of params.split) {
        const user = await userRepository.get({
          where: { ulid: entry.user_id },
        });

        if (!user) {
          throw new Http.NotFoundError(`User with ID ${entry.user_id} not found`);
        }

        splitData.push({
          expense_id: expense.id,
          owe_by_id: user.id,
          amount: entry.split_amount,
        });

        // Update balances
        const balanceData = await balanceRepository.get({
          where: {
            user_id: entry.user_id,
            another_user_id: params.user_id,
          },
        });

        const lentMoney = getLentMoney(balanceData?.lent_money, balanceData?.owe_money, entry);
        const oweMoney = getOweMoney(balanceData?.lent_money, balanceData?.owe_money, entry);

        await balanceRepository.upsert(
          {
            user_id: entry.user_id,
            another_user_id: params.user_id,
            lent_money: lentMoney,
            owe_money: oweMoney,
          },
          { transaction },
        );

        await balanceRepository.upsert(
          {
            user_id: params.user_id,
            another_user_id: entry.user_id,
            lent_money: oweMoney,
            owe_money: lentMoney,
          },
          { transaction },
        );

        // Update balance sheets
        const balanceSheet = await balanceSheetRepository.findOrCreate({
          where: { user_id: entry.user_id },
          defaults: { total_owe: 0, total_lent: 0, total_expense: 0 },
          transaction,
        });

        const updatedBalanceSheet = {
          total_owe: getOweMoney(balanceSheet.total_owe, balanceSheet.total_lent, entry),
          total_lent: getLentMoney(balanceSheet.total_owe, balanceSheet.total_lent, entry),
          total_expense: balanceSheet.total_expense + entry.split_amount,
        };

        await balanceSheetRepository.update(updatedBalanceSheet, {
          where: { user_id: entry.user_id },
          transaction,
        });
      }

      // Insert new splits
      await splitRepository.bulkCreate(splitData, { transaction });

      await transaction.commit();
      return { message: 'Expense updated successfully' };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};
