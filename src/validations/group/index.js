import Joi from 'joi';

export const createGroupBodyValidator = Joi.object({
  group_name: Joi.string()
    .min(3)
    .required(),
  desc: Joi.string().required(),
});

export const createGroupHeaderValidator = Joi.object({
  user_id: Joi.string().required(),
}).unknown(true);
