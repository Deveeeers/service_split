import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class GroupUser extends Model {
    static associate() {}
  }

  GroupUser.init(
    {
      group_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'GroupUser',
      tableName: 'groupUser',
      underscored: true,
      timestamps: true, // Ensure timestamps are disabled since createdAt and updatedAt are managed by the database
    },
  );

  return GroupUser;
};
