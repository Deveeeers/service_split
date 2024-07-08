/* eslint-disable no-useless-catch */
import { groupUserRepository } from '../repository/groupUserRepository.js';
import { addUserToGroup, createGroupService, deleteGroup } from '../service/group/add.js';

export const groupController = {
  createGroup: async (req, res) => {
    try {
      const { newGroup, welcomeUser } = await createGroupService.process(req);
      return res.status(200).json({ newGroup, welcomeUser });
    } catch (error) {
      throw error;
    }
  },

  deleteGroup: async (req, res) => {
    try {
      const deletedGroup = await deleteGroup.process(req);
      return res.status(200).json({ message: deletedGroup });
    } catch (error) {
      throw error;
    }
  },

  addUserToGroup: async (req, res) => {
    try {
      const welcomeUser = await addUserToGroup.process(req);
      return res.status(200).json({ welcomeUser });
    } catch (error) {
      throw error;
    }
  },

  deleteUserFromGroup: async (req, res) => {
    try {
      const deleteUser = await groupUserRepository.deleteUser(req);
      return res.status(200).json({ deleteUser });
    } catch (error) {
      throw error;
    }
  },
};
