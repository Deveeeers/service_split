import { expenseRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';

export const GetGroupExpenses = {
  process: async params => {
    const { group_id } = params;

    // Verify user is part of the group first
    // This would require checking group membership

    // Get all expenses for the group
    const expenses = await expenseRepository.getAll({
      where: {
        group_id,
      },
      include: [
        {
          model: Model.User,
          as: 'paid_by',
          attributes: ['user_ulid', 'name', 'email'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return {
      success: true,
      data: {
        group_id,
        expenses,
        total_expenses: expenses.length,
        total_amount: expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0),
      },
    };
  },
};
