import { userRepository } from '../repository/userRepository.js';

export const userController = {
  createUser: async (req, res) => {
    const newUser = await userRepository.createUser(req.body);
    return res.status(200).json({ newUser });
  },

  deleteUser: async (req, res) => {
    const deletedUser = await userRepository.deleteUser(req.params);
    return res.status(200).json({ message: deletedUser });
  },
};
