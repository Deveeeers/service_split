import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const groupRepository = {
  createGroup: async data => {
    const { group_name, desc } = data;
    const newGroup = await Model.GroupDetail.create({
      group_name,
      desc,
    });
    if (!newGroup) {
      const error = new InternalServerError(`Error creating the group`);
      return error;
    }
    return newGroup;
  },

  deleteGroup: async data => {
    const { id } = data;
    const deletedGroup = await Model.GroupDetail.destroy({
      where: {
        group_id: id,
      },
    });
    if (!deletedGroup) {
      const error = new InternalServerError(`Error deleting the group`);
      return error;
    }
    return deletedGroup;
  },

  get: async options => {
    const groupDetails = Model.GroupDetail.findOne(options);
    return groupDetails;
  },
};
