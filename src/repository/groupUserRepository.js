import { ErrorHander } from '../utils/errorHander.js';
import { Model } from '../db/models/index.js';

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
      throw new ErrorHander('User Already Exists in the group');
    }
    const newUserGroup = await Model.GroupUser.create({
      id: 4,
      user_id,
      group_id,
    });
    return newUserGroup;
  },

  deleteUser: async data => {
    const { user_id, group_id } = data;
    const user = await Model.GroupUser.findOne({
      where: {
        user_id,
        group_id,
      },
    });

    if (!user) {
      throw new ErrorHander('User not found in the group', 404);
    }

    const deletedUser = await Model.GroupUser.destroy({
      where: {
        user_id,
        group_id,
      },
    });

    return deletedUser;
  },
};
