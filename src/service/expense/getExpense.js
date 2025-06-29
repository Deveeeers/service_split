import { expenseRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';

export const GetExpense = {
  process: async params => {
    const { expense_id } = params;

    // Get expense details
    const expense = await expenseRepository.get({
      where: {
        expense_ulid: expense_id,
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

    if (!expense) {
      throw new Error('Expense not found');
    }

    // Verify user has access to this expense (member of the group)
    // This would require checking if user is part of the group

    return {
      success: true,
      data: expense,
    };
  },
};
