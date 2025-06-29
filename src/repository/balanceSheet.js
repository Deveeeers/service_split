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
  update: async (updateData, whereClause, options = {}) => {
    const data = await Model.Balancesheet.update(updateData, {
      where: whereClause,
      ...options,
    });
    return data;
  },
  findOrCreate: async (options = {}) => {
    const data = await Model.Balancesheet.findOrCreate(options);
    return data;
  },
};
