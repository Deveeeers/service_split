/* eslint-disable no-useless-catch */
import { addUserToGroup, createGroupService, deleteGroup, deleteUserFromGroup } from '../service/group/add.js';

export const groupController = {
  createGroup: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        ...req.headers,
        user: res.locals.user
      }
      const { newGroup, welcomeUser } = await createGroupService.process(params);
      return res.status(200).json({ newGroup, welcomeUser });
    } catch (error) {
      throw error;
    }
  },

  deleteGroup: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user
      }
      const deletedGroup = await deleteGroup.process(params);
      return res.status(200).json({ message: deletedGroup });
    } catch (error) {
      throw error;
    }
  },

  addUserToGroup: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user
      }
      await addUserToGroup.process(params);
      return res.status(200).json({message: "user added successfully"});
    } catch (error) {
      throw error;
    }
  },

  deleteUserFromGroup: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user
      }
      const deletedUser = await deleteUserFromGroup.process(params);
      return res.status(200).json({message: "user deleted successfully"});
    } catch (error) {
      throw error;
    }
  },
};
