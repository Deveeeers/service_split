import Joi from 'joi';

export const createGroupBodyValidator = Joi.object({
  group_name: Joi.string()
    .min(3)
    .required(),
  desc: Joi.string().required(),
  user_ids: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),
});

export const createGroupHeaderValidator = Joi.object({
  user_id: Joi.string().required(),
}).unknown(true);

export const addUserToGroupBodyValidator = Joi.object({
  new_user_id: Joi.required(),
  group_id: Joi.required(),
});

export const deleteUserToGroupBodyValidator = Joi.object({
  remove_user_id: Joi.required(),
  group_id: Joi.required(),
});
