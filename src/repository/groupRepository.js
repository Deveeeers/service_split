import { Model } from "../db/models/index.js";
import { ErrorHander } from "../utils/errorHander.js";

class GroupRepository {
  createGroup = async (data, options) => {
    const { group_name, desc } = data;
    const newGroup = await Model.GroupDetail.create({
      group_name: group_name,
      desc: desc,
    });
    if (!newGroup) {
      throw new ErrorHander("Error Creating the Group");
    }
    return newGroup;
  };
  deleteGroup = async (data, options) => {
    const id = data.id;
    const deletedGroup = await Model.GroupDetail.destroy({
      where: {
        group_id: id,
      },
    });
    if (!deletedGroup) {
      throw new ErrorHander("Some error occured while deleting the group");
    }
    return deletedGroup;
  };
}
export const groupRepository = new GroupRepository();
