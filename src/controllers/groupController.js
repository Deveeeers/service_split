import { groupRepository } from '../repository/groupRepository.js';
import { groupUserRepository } from '../repository/groupUserRepository.js';

export const groupController = {
  createGroup: async (req, res) => {
    const newGroup = await groupRepository.createGroup(req.body);
    req.body.group_id = newGroup.group_id;
    const welcomeUser = await groupUserRepository.addUser(req.body);
    return res.status(200).json({ newGroup, welcomeUser });
  },

  deleteGroup: async (req, res) => {
    const deleteGroup = groupRepository.deleteGroup(req.params);
    return res.status(200).json({ message: deleteGroup });
  },

  addUserToGroup: async (req, res) => {
    const welcomeUser = await groupUserRepository.addUser(req.body);
    return res.status(200).json({ welcomeUser });
  },

  deleteUserFromGroup: async (req, res) => {
    const deleteUser = await groupUserRepository.deleteUser(req.body);
    return res.status(200).json({ deleteUser });
  },
};
