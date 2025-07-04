/* eslint-disable no-restricted-syntax */
import { groupRepository, expenseRepository, userRepository, splitRepository, balanceRepository, balanceSheetRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';
import { Common } from '../../utils/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

function getLentMoney(balanceData, lentMoney, oweMoney, splitAmount) {
  if (!balanceData) return 0;
  const amount = lentMoney - oweMoney - splitAmount;
  if (amount < 0) return 0;
  return amount;
}
function getOweMoney(balanceData, lentMoney, oweMoney, splitAmount) {
  if (!balanceData) return splitAmount;
  const amount = oweMoney + splitAmount - lentMoney;
  if (amount < 0) return 0;
  return amount;
}

export const AddExpense = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      const totalSplitAmount = params.split.reduce((sum, entry) => sum + entry.split_amount, 0);

      if (totalSplitAmount !== params.total_amount) {
        throw new Http.ConflictError('Split amount total does not match the total expense amount');
      }
      const group = await groupRepository.get({
        where: {
          uuid: params.group_uuid,
        },
      });
      const userDetails = await userRepository.get({
        where: {
          ulid: params.user_id,
        },
      });

      if (!group || !userDetails) {
        const error = new Http.NotFoundError('user not found');
        throw error;
      }
      const expenseData = {
        expense_ulid: Common.createUlid(),
        title: params.title,
        desc: params.desc || '',
        amount: params.total_amount,
        group_id: group.uuid,
        paid_by_id: userDetails.ulid,
      };

      const expense = await expenseRepository.create(expenseData, { transaction });

      const splitData = [];

      for (const entry of params.split) {
        const user = await userRepository.get({
          where: {
            ulid: entry.user_id,
          },
        });
        if (!user) {
          const error = new Error(`user with ${params.user_id} not found`);
          error.status = 404;
          return error;
        }

        splitData.push({
          expense_id: expense.id,
          owe_by_id: user.id,
          amount: entry.split_amount,
        });
        const balanceData = await balanceRepository.get({
          where: {
            user_id: entry.user_id,
            another_user_id: params.user_id,
          },
        });
        const lentMoney = getLentMoney(balanceData, balanceData?.lent_money, balanceData?.owe_money, entry.split_amount);
        const oweMoney = getOweMoney(balanceData, balanceData?.lent_money, balanceData?.owe_money, entry.split_amount);
        const updatedBalanceData = {
          user_id: entry.user_id,
          another_user_id: params.user_id,
          lent_money: lentMoney,
          owe_money: oweMoney,
        };
        await balanceRepository.upsert(updatedBalanceData, {
          where: {
            user_id: entry.user_id,
            another_user_id: params.user_id,
          },
          transaction,
        });
        const updatedDataOtherSide = {
          user_id: params.user_id,
          another_user_id: entry.user_id,
          lent_money: oweMoney,
          owe_money: lentMoney,
        };
        await balanceRepository.upsert(updatedDataOtherSide, {
          where: {
            user_id: params.user_id,
            another_user_id: entry.user_id,
          },
          transaction,
        });

        const balancesheetData = await balanceSheetRepository.get({
          where: {
            user_id: entry.user_id,
          },
        });
        const totalOwe = getOweMoney(balancesheetData.total_owe, balancesheetData.total_lent, entry.split_amount);
        const totalLent = getLentMoney(balancesheetData.total_owe, balancesheetData.total_lent, entry.split_amount);
        const totalExpense = balancesheetData.total_expense + entry.split_amount;
        const updatedData = {
          total_owe: totalOwe,
          total_lent: totalLent,
          total_expense: totalExpense,
        };
        await balanceSheetRepository.update(updatedData, {
          where: {
            user_id: entry.user_id,
          },
          transaction,
        });
      }

      const split = await splitRepository.bulkCreate(splitData, { transaction });

      await transaction.commit();
      return split;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};
