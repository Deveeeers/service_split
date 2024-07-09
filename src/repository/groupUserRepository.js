import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const groupUserRepository = {
  addUser: async (data, options = {}) => {
    const { group_id, user_id } = data.body;
    const newUserGroup = await Model.GroupUser.create({ group_id, user_id }, options);
    return newUserGroup;
  },

  deleteUser: async (data, options = {}) => {
    const { user_id, group_id } = data.body;
    const deletedUser = await Model.GroupUser.destroy(
      {
        where: {
          user_id,
          group_id,
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

  selfAdd: async (data, options = {}) => {
    const { group_id } = data.body;
    const { user_id } = data.headers;
    const newUserGroup = await Model.GroupUser.create(
      {
        group_id,
        user_id,
      },
      options,
    );
    return newUserGroup;
  },
  get: async (data, options = {}) => {
    const { group_id, user_id } = data.body;
    const UserGroup = await Model.GroupUser.findOne({
      where: {
        group_id,
        user_id,
      },
      ...options, // Spread the options into the findOne method's options object
    });
    return UserGroup;
  },
};
