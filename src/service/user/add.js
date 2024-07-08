/* eslint-disable no-param-reassign */
import { Common } from '../../utils/index.js';
import { userRepository } from '../../repository/index.js';

export const createUser = {
  process: async params => {
    params.body.ulid = Common.createUlid();
    const newUser = await userRepository.createUser(params);
    return newUser;
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
