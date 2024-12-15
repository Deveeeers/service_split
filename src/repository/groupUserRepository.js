import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const groupUserRepository = {
  addUser: async (data, options = {}) => {
    const { group_id, user_id } = data.body;
    const newUserGroup = await Model.GroupUser.create({ group_id, user_id }, options);
    return newUserGroup;
  },

  deleteUser: async (options) => {
    const deletedUser = await Model.GroupUser.destroy(
     options
    );
    return deletedUser;
  },

  addUser: async (data, options = {}) => {
    const addedUsers = await Model.GroupUser.create(
      data,
      options,
    );
    return addedUsers;
  },
  addMultiple: async (data, options = {}) => {
    const addedUsers = await Model.GroupUser.bulkCreate(
      data,
      options,
    );
    return addedUsers;
  },
  get: async (options) => {
    const UserGroup = await Model.GroupUser.findOne(options);
    return UserGroup;
  },
};
