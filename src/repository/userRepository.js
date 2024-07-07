import { Model } from '../db/models/index.js';
import { ErrorHander } from '../utils/errorHander.js';

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
    if (!newUser) throw new ErrorHander('NHI BANAYA PAYYE SARKAAR AAPKA USER', 500);
    return newUser;
  },

  deleteUser: async data => {
    const { id } = data;
    const deletedUser = await Model.User.destroy({
      where: {
        id,
      },
    });
    if (!deletedUser) {
      throw new ErrorHander('Some error occured while deleting the User', 500);
    }
    return deletedUser;
  },

  update: async (data, options) => {
    const updateUser = await Model.User.update(data, options);
    if (!updateUser) {
      throw new ErrorHander('Some error occured while updating the User', 500);
    }
    return updateUser;
  },

  get: async options => {
    const userDetails = Model.User.findOne(options);
    return userDetails;
  },
};
