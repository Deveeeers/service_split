import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const groupUserRepository = {
  addUser: async data => {
    const { group_id, user_id } = data.body;
    const newUserGroup = await Model.GroupUser.create({ group_id, user_id });
    return newUserGroup;
  },

  deleteUser: async data => {
    const { user_id, group_id } = data.body;
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

  selfAdd: async data => {
    const { group_id } = data.body;
    const { user_id } = data.headers;
    const newUserGroup = await Model.GroupUser.create({
      group_id,
      user_id,
    });
    return newUserGroup;
  },
};
