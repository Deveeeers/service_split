/* eslint-disable no-useless-catch */
import { userRepository } from '../repository/userRepository.js';
import { createUser, deleteUser } from '../service/user/add.js';

export const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = await createUser.process(req);
      return res.status(200).json({ newUser });
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await deleteUser.process(req);
      return res.status(200).json({ message: deletedUser });
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await userRepository.update(req);
      return res.status(200).json({ message: updatedUser });
    } catch (error) {
      throw error;
    }
  },
};
