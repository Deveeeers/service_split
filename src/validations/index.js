import { Expense } from './expense/index.js';
import { createUserBody, UpdateUserBody } from './user/index.js';
import { createGroupHeaderValidator, createGroupBodyValidator, addUserToGroupBodyValidator, deleteUserToGroupBodyValidator } from './group/index.js';

export const Validations = {
  Expense,
  createUserBody,
  createGroupHeaderValidator,
  createGroupBodyValidator,
  UpdateUserBody,
  addUserToGroupBodyValidator,
  deleteUserToGroupBodyValidator,
};
