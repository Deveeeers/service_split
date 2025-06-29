import { balanceRepository } from '../../repository/index.js';

export const GetUserTotalBalance = {
  process: async params => {
    const { user_id } = params;

    // Get all balances where user is involved
    const userBalances = await balanceRepository.getAll({
      where: {
        user_id,
      },
    });

    const userReverseBalances = await balanceRepository.getAll({
      where: {
        another_user_id: user_id,
      },
    });

    let totalOwed = 0; // Amount user owes to others
    let totalLent = 0; // Amount others owe to user

    // Calculate from direct balances
    userBalances.forEach(balance => {
      totalLent += balance.lent_money || 0;
      totalOwed += balance.owe_money || 0;
    });

    // Calculate from reverse balances
    userReverseBalances.forEach(balance => {
      totalOwed += balance.lent_money || 0;
      totalLent += balance.owe_money || 0;
    });

    const netBalance = totalLent - totalOwed;

    let status;
    let summary;

    if (netBalance > 0) {
      status = 'you_are_owed';
      summary = `You are owed $${netBalance} overall`;
    } else if (netBalance < 0) {
      status = 'you_owe';
      summary = `You owe $${Math.abs(netBalance)} overall`;
    } else {
      status = 'settled';
      summary = 'You are all settled up!';
    }

    return {
      success: true,
      data: {
        total_lent: totalLent,
        total_owed: totalOwed,
        net_balance: netBalance,
        status,
        summary,
      },
    };
  },
};
