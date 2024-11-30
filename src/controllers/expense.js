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
    return res.status(200).json({message: "expense deleted successfully"});
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
    return res.status(200).json({message: "expense edited successfully"});
  } catch (error) {
    throw new Error(error);
  }
},
};
