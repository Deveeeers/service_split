import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const userRepository = {
  createUser: async data => {
    const { ulid, name, email, address, contact_number } = data;
    const data2 = {
      ulid,
      name,
      email,
      address,
      contact_number,
    };

    const newUser = await Model.User.create(data2);
    if (!newUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return newUser;
  },

  deleteUser: async data => {
    const { id } = data;
    const deletedUser = await Model.User.destroy({
      where: {
        id,
      },
    });
    console.log(deletedUser);
    if (!deletedUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return deletedUser;
  },

  update: async (data, options) => {
    const updateUser = await Model.User.update(data, options);
    if (!updateUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return updateUser;
  },

  get: async options => {
    const userDetails = Model.User.findOne(options);
    return userDetails;
  },
};
