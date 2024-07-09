import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class GroupDetail extends Model {
    static associate() {}
  }

  GroupDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.STRING,
      },
      group_name: {
        type: DataTypes.STRING,
      },
      desc: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'GroupDetail',
      tableName: 'groupDetail',
      underscored: true,
      timestamps: true, // Ensure timestamps are disabled since createdAt and updatedAt are managed by the database
    },
  );

  return GroupDetail;
};
