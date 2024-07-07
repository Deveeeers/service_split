import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { groupRepository } from '../repository/groupRepository.js';
import { groupUserRepository } from '../repository/groupUserRepository.js';

export class GroupController {
  createGroup = catchAsyncError(async (req, res, next) => {
    const newGroup = await groupRepository.createGroup(req.body);
    req.body.group_id = newGroup.group_id;
    const welcomeUser = await groupUserRepository.addUser(req.body);
    return res.status(200).json({ newGroup, welcomeUser });
  });

  deleteGroup = catchAsyncError((req, res, next) => {
    groupRepository.deleteGroup(req.params);
    return res.status(200).json({ message: `The Group deleted successfully` });
  });

  addUserToGroup = catchAsyncError(async (req, res, next) => {
    const welcomeUser = await groupUserRepository.addUser(req.body);
    return res.status(200).json({ welcomeUser });
  });

  deleteUserFromGroup = catchAsyncError(async (req, res, next) => {
    const deleteUser = await groupUserRepository.deleteUser(req.body);
    return res.status(200).json({ deleteUser });
  });
}

export const groupController = new GroupController();
