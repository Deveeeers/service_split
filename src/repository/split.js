import {Model} from '../db/models/index.js';

export const splitRepository = {
    create: async (params, options) => {
        const data = await Model.Split.create(params, options);
        return data;
    },
    bulkCreate: async (params, options={}) => {
        const data = await Model.Split.bulkCreate(params, options);
        return data;
    },
}
