import { balanceRepository } from '../../repository/index.js';

export const GetUserBalance = {
  process: async params => {
    const { user_id, other_user_id } = params;

    // Get balance between two users
    const balance = await balanceRepository.get({
      where: {
        user_id,
        another_user_id: other_user_id,
      },
    });

    // Also check reverse relationship
    const reverseBalance = await balanceRepository.get({
      where: {
        user_id: other_user_id,
        another_user_id: user_id,
      },
    });

    let netBalance = 0;
    let status = 'settled';

    if (balance) {
      netBalance += (balance.lent_money || 0) - (balance.owe_money || 0);
    }

    if (reverseBalance) {
      netBalance -= (reverseBalance.lent_money || 0) - (reverseBalance.owe_money || 0);
    }

    if (netBalance > 0) {
      status = 'you_are_owed';
    } else if (netBalance < 0) {
      status = 'you_owe';
      netBalance = Math.abs(netBalance);
    }

    let message;
    if (status === 'settled') {
      message = 'You are settled up';
    } else if (status === 'you_are_owed') {
      message = `You are owed $${netBalance}`;
    } else {
      message = `You owe $${netBalance}`;
    }

    return {
      success: true,
      data: {
        net_balance: netBalance,
        status,
        message,
      },
    };
  },
};
