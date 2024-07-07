import Joi from 'joi';

export const expenseHeaders = Joi.object({
    user_id: Joi.string().required(),
    group_uuid: Joi.string().required(),
  }).unknown(true);
