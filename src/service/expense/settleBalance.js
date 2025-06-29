import { balanceRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

export const SettleBalance = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      const { user_id, other_user_id, amount } = params;

      // Get current balance between users
      const balance = await balanceRepository.get({
        where: {
          user_id,
          another_user_id: other_user_id,
        },
        transaction,
      });

      const reverseBalance = await balanceRepository.get({
        where: {
          user_id: other_user_id,
          another_user_id: user_id,
        },
        transaction,
      });

      if (!balance && !reverseBalance) {
        throw new Http.NotFoundError('No balance found between these users');
      }

      // Calculate net balance and settle
      let userOwes = 0;
      let userLent = 0;

      if (balance) {
        userOwes = balance.owe_money || 0;
        userLent = balance.lent_money || 0;
      }

      if (reverseBalance) {
        userOwes += reverseBalance.lent_money || 0;
        userLent += reverseBalance.owe_money || 0;
      }

      const netAmount = userLent - userOwes;

      if (Math.abs(netAmount) < amount) {
        throw new Http.ConflictError('Settlement amount cannot be greater than the outstanding balance');
      }

      // Update balances after settlement
      if (netAmount > 0) {
        // User is owed money, so settlement reduces lent_money
        const newLentMoney = Math.max(0, userLent - amount);
        await balanceRepository.upsert(
          {
            user_id,
            another_user_id: other_user_id,
            lent_money: newLentMoney,
            owe_money: userOwes,
          },
          { transaction },
        );

        await balanceRepository.upsert(
          {
            user_id: other_user_id,
            another_user_id: user_id,
            lent_money: userOwes,
            owe_money: newLentMoney,
          },
          { transaction },
        );
      } else {
        // User owes money, so settlement reduces owe_money
        const newOweMoney = Math.max(0, userOwes - amount);
        await balanceRepository.upsert(
          {
            user_id,
            another_user_id: other_user_id,
            lent_money: userLent,
            owe_money: newOweMoney,
          },
          { transaction },
        );

        await balanceRepository.upsert(
          {
            user_id: other_user_id,
            another_user_id: user_id,
            lent_money: newOweMoney,
            owe_money: userLent,
          },
          { transaction },
        );
      }

      await transaction.commit();
      return {
        success: true,
        message: `Successfully settled $${amount} between users`,
        data: {
          settled_amount: amount,
          remaining_balance: Math.abs(netAmount) - amount,
        },
      };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};
