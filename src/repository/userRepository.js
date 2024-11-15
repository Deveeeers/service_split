import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const userRepository = {
  createUser: async (data, options = {}) => {
    const newUser = await Model.User.create(data, options);
    if (!newUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return newUser;
  },

  deleteUser: async options => {
    const deletedUser = await Model.User.destroy(
      options
    );
    return deletedUser;
  },

  update: async (data, options = {}) => {
    const updateUser = await Model.User.update(data, options);
    return updateUser;
  },

  get: async options => {
    const userDetails = Model.User.findOne(options);
    return userDetails;
  },
};
