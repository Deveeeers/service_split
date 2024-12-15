/* eslint-disable no-param-reassign */
import { Model } from '../../db/models/index.js';
import {Op} from 'sequelize';
import { Common, CONSTANTS } from '../../utils/index.js';
import { groupRepository, groupUserRepository, userRepository } from '../../repository/index.js';
import { Http } from '../../exceptions/index.js';

const { sequelize } = Model;

export const createGroupService = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {

      const userIds = params.user_ids.filter(id=> id!=params.user_id);

      const validUsers = await userRepository.getAll({
       where: {
        ulid: {
          [ Op.in]: userIds,
         }
       }
      });

      const validUserUlids = validUsers.map(user => user.ulid);

      const inValidUsers = userIds.filter( id => !validUserUlids.includes(id));

      if(inValidUsers?.length){
        throw new Http.BadRequestError(`Invalid user IDs: ${inValidUsers.join(', ')}`)
      }

      const groupData = {
        group_name: params.group_name,
        desc: params.desc,
        uuid: Common.createUlid(),
      }
      const newGroup = await groupRepository.createGroup(groupData, { transaction });
      const groupUserData = [];
      validUsers.forEach((user)=> {
        const data = {
          group_id: groupData.uuid,
          user_id: user.ulid,
          role: CONSTANTS.ROLES.MEMBER,
        }
        groupUserData.push(data);
      });

      await groupUserRepository.addMultiple(groupUserData, {transaction})



      const adminUser = await groupUserRepository.addUser( {
        group_id: groupData.uuid,
        user_id: params.user_id,
        role: CONSTANTS.ROLES.ADMIN,
      }, { transaction });
      await transaction.commit();
      return { newGroup, adminUser };
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

    const headingUserGroupDetails = await groupUserRepository.get({
     where: {
      user_id: params.user.ulid,
      group_id: params.group_id
     }
    })  
    if(!headingUserGroupDetails){
      throw new Http.BadRequestError('User Not in the group')
    }
    if(headingUserGroupDetails.role !== CONSTANTS.ROLES.ADMIN){
      throw new Http.ConflictError('You are not allowed to add new user in the group');
    }
    const newUser = await userRepository.get({
      where: {
        ulid: params.new_user_id
      }
    });
    if(!newUser){
      throw new Http.BadRequestError('New User Not exist')
    }
    const isUserAlreadyInGroup = await groupUserRepository.get({
      where: {
       user_id: params.new_user_id,
       group_id: params.group_id
      }
     })  
     if(isUserAlreadyInGroup) {
      throw new Http.ConflictError('user already in the group');
     }


     const groupUserData = {
      group_id: params.group_id,
      user_id: newUser.ulid,
      role: CONSTANTS.ROLES.MEMBER,
     }

     await groupUserRepository.addUser(groupUserData);
  },
};

export const deleteUserFromGroup = {
  process: async params => {

    const headingUserGroupDetails = await groupUserRepository.get({
     where: {
      user_id: params.user.ulid,
      group_id: params.group_id
     }
    })  
    if(!headingUserGroupDetails){
      throw new Http.BadRequestError('User Not in the group')
    }
    if(headingUserGroupDetails.role !== CONSTANTS.ROLES.ADMIN){
      throw new Http.ConflictError('You are not allowed to add new user in the group');
    }
    const newUser = await userRepository.get({
      where: {
        ulid: params.remove_user_id
      }
    });
    if(!newUser){
      throw new Http.BadRequestError('New User Not exist')
    }
    const isUserInGroup = await groupUserRepository.get({
      where: {
       user_id: params.remove_user_id,
       group_id: params.group_id
      }
     })  
     if(!isUserInGroup) {
      throw new Http.ConflictError('user not in the group');
     }


     await groupUserRepository.deleteUser({
      where: {
        user_id: params.remove_user_id,
       group_id: params.group_id
      }
     });
  },
};
