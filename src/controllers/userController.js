/* eslint-disable no-useless-catch */
import { userRepository } from '../repository/userRepository.js';

export const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = await userRepository.createUser(req.body);
      return res.status(200).json({ newUser });
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await userRepository.deleteUser(req.params);
      return res.status(200).json({ message: deletedUser });
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await userRepository.update(req.body);
      return res.status(200).json({ message: updatedUser });
    } catch (error) {
      throw error;
    }
  },
};
