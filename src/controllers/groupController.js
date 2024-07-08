/* eslint-disable no-useless-catch */
import { addUserToGroup, createGroupService, deleteGroup, deleteUserFromGroup } from '../service/group/add.js';

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
      const deletedUser = await deleteUserFromGroup.process(req);
      return res.status(200).json({ deletedUser });
    } catch (error) {
      throw error;
    }
  },
};
