import { createGroupService, deleteGroup, addUserToGroup, deleteUserFromGroup } from './add.js';
import { getGroups } from './get.js';

export const Group = {
  createGroupService,
  deleteUserFromGroup,
  deleteGroup,
  addUserToGroup,
  getGroups,
};
