/* eslint-disable no-useless-catch */
import { Group } from '../service/index.js';

const { addUserToGroup, createGroupService, deleteGroup, deleteUserFromGroup, getGroups } = Group;

export const groupController = {
  createGroup: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        ...req.headers,
        user: res.locals.user,
      };
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
        user: res.locals.user,
      };
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
        user: res.locals.user,
      };
      await addUserToGroup.process(params);
      return res.status(200).json({ message: 'user added successfully' });
    } catch (error) {
      throw error;
    }
  },

  deleteUserFromGroup: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user,
      };
      await deleteUserFromGroup.process(params);
      return res.status(200).json({ message: 'user deleted successfully' });
    } catch (error) {
      throw error;
    }
  },

  // get Controllers
  getAllGroups: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user,
      };
      const groups = await getGroups.all(params);
      return res.status(200).json({ message: 'groups fetched successfully', groups });
    } catch (error) {
      throw error;
    }
  },
  getAllUserGroups: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
        user: res.locals.user,
      };
      const groups = await getGroups.allUserGroups(params);
      return res.status(200).json({ message: 'groups fetched successfully', groups });
    } catch (error) {
      throw error;
    }
  },
};
