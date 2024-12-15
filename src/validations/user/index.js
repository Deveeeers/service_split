import Joi from 'joi';

export const createUserBody = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email(),
  address: Joi.string().optional(),
  contact_number: Joi.string().optional(),
});

export const UpdateUserBody = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional().email(),
  address: Joi.string().optional(),
  contact_number: Joi.string().optional(),
}).or('name', 'email', 'address', 'contact_number');
