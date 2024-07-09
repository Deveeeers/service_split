import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const userRepository = {
  createUser: async (data, options = {}) => {
    const newUser = await Model.User.create(data.body, options);
    if (!newUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return newUser;
  },

  deleteUser: async (data, options = {}) => {
    const { id: ulid } = data.params;
    const deletedUser = await Model.User.destroy(
      {
        where: {
          ulid,
        },
      },
      options,
    );
    if (!deletedUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return deletedUser;
  },

  update: async (data, options = {}) => {
    const { id } = data.params;
    const updateUser = await Model.User.update(data.body, { where: { ulid: id } }, options);
    if (!updateUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return updateUser;
  },

  get: async options => {
    const userDetails = Model.User.findOne(options);
    return userDetails;
  },
};
