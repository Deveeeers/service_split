import { Model } from '../db/models/index.js';
import { InternalServerError } from '../exceptions/http/internalServer.js';

export const groupRepository = {
  createGroup: async (data, options = {}) => {
    const newGroup = await Model.GroupDetail.create(data.body, options);
    if (!newGroup) {
      const error = new InternalServerError(`Error creating the group`);
      throw error;
    }
    return newGroup;
  },

  deleteGroup: async (data, options = {}) => {
    const { id } = data.params;
    const deletedGroup = await Model.GroupDetail.destroy(
      {
        where: {
          uuid: id,
        },
      },
      options,
    );
    if (!deletedGroup) {
      const error = new InternalServerError(`Error deleting the group`);
      throw error;
    }
    return deletedGroup;
  },

  get: async options => {
    const groupDetails = Model.GroupDetail.findOne(options);
    return groupDetails;
  },
};
