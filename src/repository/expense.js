import { Model } from '../db/models/index.js';

export const expenseRepository = {
  create: async (params, options = {}) => {
    const data = await Model.Expense.create(params, options);
    return data;
  },
  get: async (params, options = {}) => {
    const data = await Model.Expense.findOne(params, options);
    return data;
  },
  delete: async (params, options = {}) => {
    console.log(params?.expense_id);
    const data = await Model.Expense.destroy({
      where: { expense_ulid: params.expense_id },
      ...options,
    });
    return data;
  },
  update: async (updateData, whereClause, options = {}) => {
    const data = await Model.Expense.update(updateData, {
      where: whereClause,
      ...options,
    });
    return data;
  },
  getAll: async (options = {}) => {
    const data = await Model.Expense.findAll(options);
    return data;
  },
};
