import Joi from 'joi';
import {CONSTANTS} from '../../utils/constants.js';

export const expenseBody = Joi.object({
    total_amount: Joi.number().min(0).required(),
    currency: Joi.string().valid(...Object.keys(CONSTANTS.currency)),
    title: Joi.string().required(),
    desc: Joi.string().optional(),
    split: Joi.array().items(
        {
            user_id: Joi.string(),
            split_amount: Joi.string(),
        }
    ).required(),

})