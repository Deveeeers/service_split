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
router.delete(`/group/:id`, isUserExists, aeh(groupController.deleteGroup));
router.post('/group/user/add', requestValidator(Validations.addUserToGroupBodyValidator, CONSTANTS.REQUEST.BODY), isUserExists, aeh(groupController.addUserToGroup));
router.delete('/group/user/delete', requestValidator(Validations.deleteUserToGroupBodyValidator, CONSTANTS.REQUEST.BODY), isUserExists, aeh(groupController.deleteUserFromGroup));
router.post('/user', requestValidator(Validations.createUserBody, CONSTANTS.REQUEST.BODY), aeh(userController.createUser));
router.delete('/user/:id', aeh(userController.deleteUser));
router.put('/user/:id', requestValidator(Validations.UpdateUserBody, CONSTANTS.REQUEST.BODY), aeh(userController.updateUser));
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
router.delete(
  '/expense/:expense_id',
  requestValidator(Validations.Expense.expenseHeaders, CONSTANTS.REQUEST.HEADERS),
  requestValidator(Validations.Expense.expenseParams, CONSTANTS.REQUEST.PARAMS),
  aeh(ExpenseController.deleteExpense),
);

// Get expense details
router.get(
  '/expense/:expense_id',
  requestValidator(Validations.Expense.expenseHeaders, CONSTANTS.REQUEST.HEADERS),
  requestValidator(Validations.Expense.expenseParams, CONSTANTS.REQUEST.PARAMS),
  aeh(ExpenseController.getExpense),
);

// Get all expenses for a group
router.get('/group/:group_id/expenses', requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS), isUserExists, aeh(ExpenseController.getGroupExpenses));

// Get user total balance (how much they owe/are owed overall)
router.get('/user/balance/total', requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS), isUserExists, aeh(ExpenseController.getUserTotalBalance));

// Get balance between two specific users
router.get(
  '/user/balance/:other_user_id',
  requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS),
  isUserExists,
  aeh(ExpenseController.getUserBalance),
);

// Settle balance between users
router.post('/user/settle-balance', requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS), isUserExists, aeh(ExpenseController.settleBalance));

// Get user expense summary
router.get(
  '/user/expense-summary',
  requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS),
  isUserExists,
  aeh(ExpenseController.getUserExpenseSummary),
);

// get API's

router.get('/groups/all', requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS), isUserExists, aeh(groupController.getAllGroups));

router.get('/user/groups', requestValidator(Validations.createGroupHeaderValidator, CONSTANTS.REQUEST.HEADERS), isUserExists, aeh(groupController.getAllUserGroups));
