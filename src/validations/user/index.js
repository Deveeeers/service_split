import Joi from 'joi';

export const createUserBody = Joi.object({
  ulid: Joi.string()
    .min(0)
    .required(),
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email(),
  address: Joi.string().optional(),
  contact_number: Joi.string().optional(),
});
