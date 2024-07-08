import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const groupUserRepository = {
  addUser: async data => {
    const { user_id, group_id } = data;
    const existingUser = await Model.GroupUser.findOne({
      where: {
        user_id,
        group_id,
      },
    });
    if (existingUser) {
      const error = new InternalServerError('User already exist in group');
      throw error;
    }
    const newUserGroup = await Model.GroupUser.create({
      id: 4,
      user_id,
      group_id,
    });
    throw newUserGroup;
  },

  deleteUser: async data => {
    const { user_id, group_id } = data;
    const deletedUser = await Model.GroupUser.destroy({
      where: {
        user_id,
        group_id,
      },
    });

    if (!deletedUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }

    return deletedUser;
  },
};
