/* eslint-disable no-param-reassign */
import { Common } from '../../utils/index.js';
import { userRepository, balanceSheetRepository } from '../../repository/index.js';
import { Model } from '../../db/models/index.js';

const { sequelize } = Model;

export const createUser = {
  process: async params => {
    const transaction = await sequelize.transaction();
    try {
      params.body.ulid = Common.createUlid();
    const newUser = await userRepository.createUser(params, {transaction});
   const balancesheetData =  {
    user_id: newUser.ulid,
    total_owe: 0,
    total_lend: 0,
    total_expense: 0,
    total_payment: 0,
   };
   await balanceSheetRepository.create(balancesheetData, {transaction});
   await transaction.commit();
    return newUser;
  
    } catch (error) {
      if(transaction){
        await transaction.rollback();
      }
      throw error;
      
    }
  },
};

export const deleteUser = {
  process: async params => {
    const deletedUser = await userRepository.deleteUser(params);
    return deletedUser;
  },
};

export const updateUser = {
  process: async params => {
    const updatedUser = await userRepository.update(params);
    return updatedUser;
  },
};
