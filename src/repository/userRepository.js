import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const userRepository = {
  createUser: async data => {
    const newUser = await Model.User.create(data);
    if (!newUser) {
      const error = new InternalServerError('group  or user Not found');
      throw error;
    }
    return newUser;
  },

  deleteUser: async data => {
    const { id: ulid } = data;
    const deletedUser = await Model.User.destroy({
      where: {
        ulid,
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
    const { name, email, address, contact_number } = data;
    const data2 = { name, email, address, contact_number };
    const updateUser = await Model.User.update(data2, options);
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
