/* eslint-disable no-param-reassign */
import { Common } from '../../utils/index.js';
import {Http} from '../../exceptions/index.js'
import { userRepository, balanceSheetRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';

const { sequelize } = Model;

export const createUser = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      const userData = {
        ulid: Common.createUlid(),
        name: params.name,
        email: params.email,
        address: params.address,
        contact_number: params.contact_number
      }
      const newUser = await userRepository.createUser(userData, { transaction });
      const balancesheetData = {
        user_id: newUser.ulid,
        total_owe: 0,
        total_lend: 0,
        total_expense: 0,
        total_payment: 0,
      };
      await balanceSheetRepository.create(balancesheetData, { transaction });
      await transaction.commit();
      return newUser;

    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;

    }
  },
};

export const deleteUser = {
  process: async params => {
    const options = {where: {ulid: params.id}};
    const userDetails = await userRepository.get(options);
    if(!userDetails){
      throw Http.ConflictError(`user not exist for this ${params.id}`)
    }
    const deletedUser = await userRepository.deleteUser(options);
    return deletedUser;
  },
};

export const updateUser = {
  process: async params => {
const options = {where: {ulid: params.id}};
    const userDetails = await userRepository.get(options);
    if(!userDetails){
      throw Http.ConflictError(`user not exist for this ${id}`)
    }
    const userData = {
      name: params.name ?? userDetails.name,
      email: params.email ?? userDetails.email,
      address: params.address ?? userDetails.address,
      contact_number: params.contact_number ?? userDetails.contact_number
    }
    const updatedUser = await userRepository.update(userData,options );
    return updatedUser;
  },
};
