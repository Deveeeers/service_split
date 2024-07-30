import { groupRepository, expenseRepository, userRepository, splitRepository, balanceRepository, balanceSheetRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';
import { Common } from '../../utils/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

function getLentMoney(lentMoney,oweMoney, entry){
    if(!balanceData) return 0;
    const amount = lentMoney - oweMoney - entry.split_amount;
    if(amount <0) return 0;
    return amount;
}
function getOweMoney(lentMoney,oweMoney, entry){
    if(!balanceData) return entry.split_amount;
    const amount = oweMoney + entry.split_amount - lentMoney;
    if(amount <0) return 0;
    return amount;
}

export const AddExpense = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
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
        const error = new Http.NotFoundError('user not found')
        throw error;
      }
      const expenseData = {
        expense_ulid: Common.createUlid(),
        title: params.title,
        desc: params.desc || '',
        amount: params.total_amount,
        group_id: group.group_id,
        paid_by_id: userDetails.id,
      };

      const expense = await expenseRepository.create(expenseData, { transaction });

      const splitData = [];
      let totalSplitAmount = 0;

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
        totalSplitAmount += entry.split_amount;

        splitData.push({
          expense_id: expense.id,
          owe_by_id: user.id,
          amount: entry.split_amount,
        });
        const balanceData = await balanceRepository.get({where: {
            user_id: entry.user_id,
            another_user_id: params.user_id,
        }});
        const lentMoney = getLentMoney(balanceData, entry); 
        const oweMoney = getOweMoney(balanceData, entry); 
        const updatedBalanceData = {
            user_id: entry.user_id,
            another_user_id: params.user_id,
            lent_money: lentMoney,
            owe_money: oweMoney,
        };
        await balanceRepository.upsert(updatedBalanceData, {where: {
            user_id: entry.user_id,
            another_user_id: params.user_id,
        },
    transaction,});
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

        const balancesheetData = await balanceSheetRepository.get({where: {
            user_id: entry.user_id,
        }});
        const totalOwe = getOweMoney(balancesheetData.total_owe, balancesheetData.total_lent, splitAmount);
        const totalLent = getLentMoney(balancesheetData.total_owe, balancesheetData.total_lent, splitAmount);
        const totalExpense = balancesheetData.total_expense + split_amount;
        const updatedData = {
            total_owe:totalOwe,
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

      if (totalSplitAmount !== params.total_amount) {
        const error = new Error(`split amount total not matched`);
        error.status = 409;
        return error;
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
