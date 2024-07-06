import Joi from "joi";

export const expenseHeaders = {
    user_id: Joi.string(),
    group_uuid: Joi.string(),
}