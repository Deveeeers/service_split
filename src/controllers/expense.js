/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
import { AddExpense, deleteExpense } from '../service/expense/add.js';

export const ExpenseController = {
  add: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.params,
        ...req.body,
      };
      const response = await AddExpense.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteExpense: async (req, res) => {
    try {
      const deletedExpense = await deleteExpense.process(req);
      res.status(200).json({ msg: deletedExpense });
    } catch (error) {
      throw error;
    }
  },
};
