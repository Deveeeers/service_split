import { groupRepository, expenseRepository, userRepository, splitRepository  } from "../../repository/index.js";
import { Model } from "../../db/models/index.js";
import { Common } from "../../utils/index.js";

const {sequelize} = Model;

export const AddExpense = {
    process: async params => {
        const transaction = await sequelize.transaction();
       try {
        const group = await groupRepository.get({
            where: {
                uuid: params.group_uuid,
            }
        });
        const userDetails = await userRepository.get({
            where: {
                ulid: params.user_id,
            }
        });

        if(!group || !userDetails){
            const error = new Error('group  or user Not found');
            error.status = 404;
            return error;
        };
        const expenseData = {
            expense_ulid: Common.createUlid(),
            title: params.title,
            desc: params.desc || '',
            amount: params.total_amount,
            group_id: group.group_id,
            paid_by_id: userDetails.id,
        };

        const expense = await expenseRepository.create(expenseData, { transaction});

        const splitData = [];
        let totalSplitAmount = 0;

        for ( const entry of params.split){
            const user = await userRepository.get({
                where: {
                    ulid: params.user_id,
                }
            });
            if(!user){
                const error = new Error(`user with ${params.user_id} not found` );
                error.status = 404;
                return error;
            };
            totalSplitAmount += entry.split_amount;
            
            splitData.push({
                expense_id: expense.id,
                owe_by_id: user.id,
                amount: entry.split_amount,
            }); 

        }

        if(totalSplitAmount!= params.total_amount){
            const error = new Error(`split amount total not matched` );
            error.status = 409;
            return error;
        }
        const split = await splitRepository.bulkCreate(splitData, {transaction});

        await transaction.commit();



       } catch (error) {
        if(transaction){
            await transaction.rollback();
        }
        throw error;
        
       }

        

    }  
} 