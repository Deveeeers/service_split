import { Model } from "../db/models/index.js";
import { ErrorHander } from "../utils/errorHander.js";

class UserRepository {
  createUser = async (data, options) => {
    const { ulid, name, email, address, contact_number } = data;
    data = {
      ulid,
      name,
      email,
      address,
      contact_number,
    };
    const newUser = await Model.User.create(data);
    if (!newUser)
      throw new ErrorHander("NHI BANAYA PAYYE SARKAAR AAPKA USER", 500);
    return newUser;
  };
  deleteUser = async (data, options) => {
    const id = data.id;
    const deletedUser = await Model.User.destroy({
      where: {
        id: id,
      },
    });
    if (!deletedUser) {
      throw new ErrorHander("Some error occured while deleting the User", 500);
    }
    return deletedUser;
  };
  update = async (data, options) => {
    const updateUser = await Model.User.update(data, options);
    if (!updateUser) {
      throw new ErrorHander("Some error occured while updating the User", 500);
    }
    return updateUser;
  };
  get =  async (options) => {
    const userDetails =  Model.User.findOne(options);
    return userDetails; 
  }
}
export const userRepository = new UserRepository();
