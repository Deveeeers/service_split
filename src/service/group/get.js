import { Op } from 'sequelize';
import { groupRepository, groupUserRepository } from '../../repository/index.js';

export const getGroups = {
  all: async () => {
    const groups = await groupRepository.getAll({
      order: [['createdAt', 'DESC']],
    });
    return groups;
  },
  allUserGroups: async params => {
    const userGroups = await groupUserRepository.getAll({
      order: [['created_at', 'DESC']],
      where: {
        user_id: params.user.ulid,
      },
    });
    const groupIds = userGroups.map(element => element.group_id);
    const groups = await groupRepository.getAll({
      order: [['createdAt', 'DESC']],
      where: {
        uuid: {
          [Op.in]: groupIds,
        },
      },
    });
    return groups;
  },
};
