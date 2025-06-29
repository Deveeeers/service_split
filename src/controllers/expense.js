/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
import { Expense } from '../service/expense/index.js';

export const ExpenseController = {
  add: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.params,
        ...req.body,
      };
      const response = await Expense.AddExpense.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteExpense: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.params,
        ...req.body,
      };
      const response = await Expense.DeleteExpense.process(params);
      return res.status(200).json({ message: 'expense deleted successfully', response });
    } catch (error) {
      throw new Error(error);
    }
  },
  editExpense: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.params,
        ...req.body,
      };
      const response = await Expense.EditExpense.process(params);
      return res.status(200).json({ message: 'expense edited successfully', response });
    } catch (error) {
      throw new Error(error);
    }
  },

  getExpense: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.params,
      };
      const response = await Expense.GetExpense.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },

  getGroupExpenses: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.params,
      };
      const response = await Expense.GetGroupExpenses.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },

  getUserTotalBalance: async (req, res) => {
    try {
      const params = {
        ...req.headers,
      };
      const response = await Expense.GetUserTotalBalance.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },

  getUserBalance: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.params,
      };
      const response = await Expense.GetUserBalance.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },

  settleBalance: async (req, res) => {
    try {
      const params = {
        ...req.headers,
        ...req.body,
      };
      const response = await Expense.SettleBalance.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },

  getUserExpenseSummary: async (req, res) => {
    try {
      const params = {
        ...req.headers,
      };
      const response = await Expense.GetUserExpenseSummary.process(params);
      return res.status(200).json(response);
    } catch (error) {
      throw new Error(error);
    }
  },
};
