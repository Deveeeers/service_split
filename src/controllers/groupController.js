import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { groupRepository } from '../repository/groupRepository.js';
import { groupUserRepository } from '../repository/groupUserRepository.js';

export const groupController = {
  createGroup: catchAsyncError(async (req, res) => {
    const newGroup = await groupRepository.createGroup(req.body);
    req.body.group_id = newGroup.group_id;
    const welcomeUser = await groupUserRepository.addUser(req.body);
    return res.status(200).json({ newGroup, welcomeUser });
  }),

  deleteGroup: catchAsyncError((req, res) => {
    groupRepository.deleteGroup(req.params);
    return res.status(200).json({ message: `The Group deleted successfully` });
  }),

  addUserToGroup: catchAsyncError(async (req, res) => {
    const welcomeUser = await groupUserRepository.addUser(req.body);
    return res.status(200).json({ welcomeUser });
  }),

  deleteUserFromGroup: catchAsyncError(async (req, res) => {
    const deleteUser = await groupUserRepository.deleteUser(req.body);
    return res.status(200).json({ deleteUser });
  }),
};
