import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { userRepository } from '../repository/userRepository.js';

export class UserController {
  createUser = catchAsyncError(async (req, res) => {
    const newUser = await userRepository.createUser(req.body);
    return res.status(200).json({ newUser });
  });

  deleteUser = catchAsyncError(async (req, res) => {
    const deletedUser = await userRepository.deleteUser(req.params);
    return res.status(200).json({ message: deletedUser });
  });
}

export const userController = new UserController();
