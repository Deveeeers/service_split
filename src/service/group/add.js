/* eslint-disable no-param-reassign */
import { Model } from '../../db/models/index.js';
import { Common } from '../../utils/index.js';
import { groupRepository, groupUserRepository } from '../../repository/index.js';
import { InternalServerError } from '../../exceptions/http/internalServer.js';

const { sequelize } = Model;

export const createGroupService = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      params.body.uuid = Common.createUlid();
      const newGroup = await groupRepository.createGroup(params, { transaction });
      params.body.group_id = newGroup.uuid;
      const welcomeUser = await groupUserRepository.selfAdd(params, { transaction });
      await transaction.commit();
      return { newGroup, welcomeUser };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};

export const deleteGroup = {
  process: async params => {
    const deletedGroup = await groupRepository.deleteGroup(params);
    return deletedGroup;
  },
};

export const addUserToGroup = {
  process: async params => {
    const user = await groupUserRepository.get(params);
    if (user) throw new InternalServerError('User alreaady exist in group');
    const welcomeUser = await groupUserRepository.addUser(params);
    return welcomeUser;
  },
};

export const deleteUserFromGroup = {
  process: async params => {
    const deletedUser = await groupRepository.deleteGroup(params);
    return deletedUser;
  },
};
