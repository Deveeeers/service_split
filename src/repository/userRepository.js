import { Model } from '../db/models/index.js';

export const userRepository = {
  createUser: async (data, options = {}) => {
    const newUser = await Model.User.create(data, options);

    return newUser;
  },

  deleteUser: async options => {
    const deletedUser = await Model.User.destroy(options);
    return deletedUser;
  },

  update: async (data, options = {}) => {
    const updateUser = await Model.User.update(data, options);
    return updateUser;
  },

  get: async options => {
    const userDetails = await Model.User.findOne(options);
    return userDetails;
  },

  getAll: async options => {
    const userDetails = await Model.User.findAll(options);
    return userDetails;
  },
};
