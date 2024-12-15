import Joi from 'joi';

export const expenseParams = Joi.object({
  expense_id: Joi.string().required(),
}).unknown(true);
