/* eslint-disable no-param-reassign */
import { Model } from '../../db/models/index.js';
import { Common } from '../../utils/index.js';
import { groupRepository, groupUserRepository } from '../../repository/index.js';

const { sequelize } = Model;

export const createGroupService = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      params.body.uuid = Common.createUlid();
      const newGroup = await groupRepository.createGroup(params);
      params.body.group_id = newGroup.uuid;
      const welcomeUser = await groupUserRepository.selfAdd(params);
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
    const welcomeUser = await groupUserRepository.addUser(params);
    return welcomeUser;
  },
};
