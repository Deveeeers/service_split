import {Model} from 'sequelize';

export default (sequelize, DataTypes ) => {
    class User extends Model {
        /**
         * 
         */
        static  associate() {}
    }

    User.init (
        {
            ulid: {
                type: DataTypes.STRING,
            } ,
            name: {
                type: DataTypes.STRING
            } ,
            email: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            } ,
            contact_number: {
                type: DataTypes.STRING

            } ,

        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            underscored: true,
            timestamps: true, 
        },
    )
    return User;
}