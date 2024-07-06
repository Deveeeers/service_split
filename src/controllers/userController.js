import { ErrorHander } from '../utils/errorHander.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { userRepository } from '../repository/userRepository.js';

export class UserController {
  createUser = catchAsyncError(async (req, res, next) => {
    const newUser = await userRepository.createUser(req.body);
    return res.status(200).json({ newUser });
  });

  deleteUser = catchAsyncError((req, res, next) => {
    const deletedUser = userRepository.deleteUser(req.params);
    return res.status(200).json({ message: `Successfully deleted the User` });
  });
}

export const userController = new UserController();
