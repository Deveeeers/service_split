import { Model } from "../db/models/index.js";
import { ErrorHander } from "../utils/errorHander.js";

class UserRepository {
  createUser = async ({ ulid, name, email, address, contact_number }) => {
    const newUser = await Model.User.create({
      ulid,
      name,
      email,
      address,
      contact_number,
    });
    if (!newUser)
      throw new ErrorHander("NHI BANAYA PAYYE SARKAAR AAPKA USER", 500);
    return newUser;
  };
  deleteUser = async (id) => {
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
}
export const userRepository = new UserRepository();
