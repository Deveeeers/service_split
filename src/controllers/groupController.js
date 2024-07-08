/* eslint-disable no-useless-catch */
import { groupRepository } from '../repository/groupRepository.js';
import { groupUserRepository } from '../repository/groupUserRepository.js';

export const groupController = {
  createGroup: async (req, res) => {
    try {
      const newGroup = await groupRepository.createGroup(req.body);
      req.body.group_id = newGroup.group_id;
      const welcomeUser = await groupUserRepository.addUser(req.body);
      return res.status(200).json({ newGroup, welcomeUser });
    } catch (error) {
      throw error;
    }
  },

  deleteGroup: async (req, res) => {
    try {
      const deleteGroup = await groupRepository.deleteGroup(req.params);
      return res.status(200).json({ message: deleteGroup });
    } catch (error) {
      throw error;
    }
  },

  addUserToGroup: async (req, res) => {
    try {
      const welcomeUser = await groupUserRepository.addUser(req.body);
      return res.status(200).json({ welcomeUser });
    } catch (error) {
      throw error;
    }
  },

  deleteUserFromGroup: async (req, res) => {
    try {
      const deleteUser = await groupUserRepository.deleteUser(req.body);
      return res.status(200).json({ deleteUser });
    } catch (error) {
      throw error;
    }
  },
};
