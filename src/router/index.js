import { Router } from 'express';
import { CONSTANTS } from '../utils/index.js';
import { groupController, userController, ExpenseController } from '../controllers/index.js';
import { Validations } from '../validations/index.js';
import { requestValidator, aeh } from '../middleware/index.js';

export const router = Router();

router.post('/group', aeh(groupController.createGroup));
router.delete(`/group/:id`, aeh(groupController.deleteGroup));
router.post('/groupuser', aeh(groupController.addUserToGroup));
router.delete('/groupuser', aeh(groupController.deleteUserFromGroup));
router.post('/user', aeh(userController.createUser));
router.delete('/user/:id', aeh(userController.deleteUser));
router.post(
  '/expense/:action',
  requestValidator(Validations.Expense.expenseBody, CONSTANTS.REQUEST.BODY),
  requestValidator(Validations.Expense.expenseHeaders, CONSTANTS.REQUEST.HEADERS),
  aeh(ExpenseController.add),
);
