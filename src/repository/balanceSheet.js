import { Model } from '../db/models/index.js';

export const balanceSheetRepository = {
  create: async (params, options = {}) => {
    const data = await Model.Balancesheet.create(params, options);
    return data;
  },
  get: async (params, options = {}) => {
    const data = await Model.Balancesheet.findOne(params, options);
    return data;
  },
  update: async (params, options = {}) => {
    const data = await Model.Balancesheet.update(params, options);
    return data;
  },
};
