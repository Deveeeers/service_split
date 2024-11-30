import { Router } from 'express';
import { CONSTANTS } from '../utils/index.js';
import { groupController, userController, ExpenseController } from '../controllers/index.js';
import { Validations } from '../validations/index.js';
import { requestValidator, aeh, isUserExists } from '../middleware/index.js';

export const router = Router();

router.post(
  '/group/create',
  requestValidator(Validations.createGroupBodyValidator, CONSTANTS.REQUEST.BODY),
  requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS),
  aeh(groupController.createGroup),
);
router.delete(`/group/:id`,  isUserExists, aeh(groupController.deleteGroup));
router.post('/group/user/add', requestValidator(Validations.addUserToGroupBodyValidator, CONSTANTS.REQUEST.BODY), isUserExists, aeh(groupController.addUserToGroup));
router.delete('/group/user/delete',  requestValidator(Validations.deleteUserToGroupBodyValidator, CONSTANTS.REQUEST.BODY),  isUserExists, aeh(groupController.deleteUserFromGroup));
router.post('/user', requestValidator(Validations.createUserBody, CONSTANTS.REQUEST.BODY), aeh(userController.createUser));
router.delete('/user/:id', aeh(userController.deleteUser));
router.put('/user/:id', requestValidator(Validations.UpdateUserBody, CONSTANTS.REQUEST.BODY), userController.updateUser);
router.post(
  '/expense/add',
  requestValidator(Validations.Expense.expenseBody, CONSTANTS.REQUEST.BODY),
  requestValidator(Validations.Expense.expenseHeaders, CONSTANTS.REQUEST.HEADERS),
  aeh(ExpenseController.add),
);
router.post(
  '/expense/edit/:expense_id',
  requestValidator(Validations.Expense.expenseBody, CONSTANTS.REQUEST.BODY),
  requestValidator(Validations.Expense.expenseHeaders, CONSTANTS.REQUEST.HEADERS),
  requestValidator(Validations.Expense.expenseParams, CONSTANTS.REQUEST.PARAMS),
  aeh(ExpenseController.editExpense),
);
router.delete('/expense/:expense_id', requestValidator(Validations.Expense.expenseHeaders, CONSTANTS.REQUEST.HEADERS),
requestValidator(Validations.Expense.expenseParams, CONSTANTS.REQUEST.PARAMS),aeh(ExpenseController.deleteExpense));
