import { AddExpense } from "../service/expense/add.js"

export const ExpenseController = {
    add: async (req, res) => {
       try {
        const params = {
            ...req.headers,
            ...req.params,
            ...req.body,
        }
        const response = await AddExpense.process(params);
        return  res.status(200).json(response);
       } catch (error) {
        throw error;
       }
    }
}