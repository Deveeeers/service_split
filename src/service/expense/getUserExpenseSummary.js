import { expenseRepository, balanceRepository, groupUserRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';

export const GetUserExpenseSummary = {
  process: async params => {
    const { user_id } = params;

    // Get all groups the user is part of
    const userGroups = await groupUserRepository.getAll({
      where: { user_id },
      include: [
        {
          model: Model.GroupDetail,
          as: 'group',
          attributes: ['group_ulid', 'name'],
        },
      ],
    });

    const groupIds = userGroups.map(ug => ug.group_id);

    // Get all expenses the user paid for
    const paidExpenses = await expenseRepository.getAll({
      where: {
        paid_by_id: user_id,
        group_id: groupIds,
      },
      include: [
        {
          model: Model.GroupDetail,
          as: 'group',
          attributes: ['group_ulid', 'name'],
        },
      ],
    });

    // Get all expenses in groups where user is involved
    const groupExpenses = await expenseRepository.getAll({
      where: {
        group_id: groupIds,
      },
      include: [
        {
          model: Model.User,
          as: 'paid_by',
          attributes: ['user_ulid', 'name', 'email'],
        },
        {
          model: Model.GroupDetail,
          as: 'group',
          attributes: ['group_ulid', 'name'],
        },
      ],
    });

    // Calculate summary
    const totalPaid = paidExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
    const totalGroupExpenses = groupExpenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

    // Get user's current total balance
    const userBalances = await balanceRepository.getAll({
      where: { user_id },
    });

    const userReverseBalances = await balanceRepository.getAll({
      where: { another_user_id: user_id },
    });

    let totalOwed = 0;
    let totalLent = 0;

    userBalances.forEach(balance => {
      totalLent += balance.lent_money || 0;
      totalOwed += balance.owe_money || 0;
    });

    userReverseBalances.forEach(balance => {
      totalOwed += balance.lent_money || 0;
      totalLent += balance.owe_money || 0;
    });

    return {
      success: true,
      data: {
        user_id,
        groups_count: userGroups.length,
        total_expenses_paid: totalPaid,
        expenses_paid_count: paidExpenses.length,
        total_group_expenses: totalGroupExpenses,
        group_expenses_count: groupExpenses.length,
        balance_summary: {
          total_lent: totalLent,
          total_owed: totalOwed,
          net_balance: totalLent - totalOwed,
        },
        recent_expenses: groupExpenses.slice(0, 10), // Last 10 expenses
      },
    };
  },
};
