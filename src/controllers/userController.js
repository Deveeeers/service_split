/* eslint-disable no-useless-catch */
import { createUser, deleteUser, updateUser } from '../service/user/add.js';

export const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = await createUser.process(req.body);
      return res.status(200).json({ newUser });
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
      };
      const deletedUser = await deleteUser.process(params);
      return res.status(200).json({ message: deletedUser });
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (req, res) => {
    try {
      const params = {
        ...req.body,
        ...req.params,
      };
      const updatedUser = await updateUser.process(params);
      return res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      throw error;
    }
  },
};
