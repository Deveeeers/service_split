import {Model} from '../db/models/index.js';

export const expenseRepository = {
    create: async (params, options = {}) => {
        const data = await Model.Expense.create(params, options);
        return data;
    }

}

