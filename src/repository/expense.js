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
    console.log(params?.params?.id);
    const data = await Model.Expense.destroy({ where: { expense_ulid: params.params.id } }, options);
    return data;
  },
};
