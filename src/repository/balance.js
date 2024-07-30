import { Model } from '../db/models/index.js';

export const balanceRepository = {
  create: async (params, options = {}) => {
    const data = await Model.Balance.create(params, options);
    return data;
  },
  upsert:async (params, options = {}) => {
    let instance = await Model.Balance.findOne(options);
    if(instance){
        await Model.Balance.update(params, options);
       
    }
   else {
    instance =  await Model.Balance.create(params, options);
   }
    return instance;
  },
  update: async (params, options = {}) => {
    const data = await Model.Balance.update(params, options);
    return data;
  },
  get: async (options = {}) => {
    const data = await Model.Balance.findOne(options);
    return data;
  },
  delete: async (params, options = {}) => {
    console.log(params?.params?.id);
    const data = await Model.Balance.destroy(options);
    return data;
  },
};
