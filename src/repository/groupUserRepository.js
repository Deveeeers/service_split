import { ErrorHander } from "../utils/errorHander.js";
import { Model } from "../db/models/index.js";

class GroupUserRepository {
  addUser = async ({ user_id, group_id }) => {
    console.log({ user_id, group_id });
    // const existingUser = await Model.GroupUser.findOne({
    //   where: {
    //     user_id: user_id,
    //     group_id: group_id,
    //   },
    // });
    // if (existingUser) {
    //   throw new ErrorHander("User Already Exists in the group");
    // }
    const newUserGroup = await Model.GroupUser.create({
      id: 4,
      user_id: user_id,
      group_id: group_id,
    });
    console.log(newUserGroup);

    return newUserGroup;
  };

  deleteUser = async ({ user_id, group_id }) => {
    const user = await Model.GroupUser.findOne({
      where: {
        user_id: user_id,
        group_id: group_id,
      },
    });

    console.log(user);

    if (!user) {
      throw new ErrorHander("User not found in the group", 404);
    }

    const deletedUser = await Model.GroupUser.destroy({
      where: {
        user_id: user_id,
        group_id: group_id,
      },
    });

    return deletedUser;
  };
}

export const groupUserRepository = new GroupUserRepository();
