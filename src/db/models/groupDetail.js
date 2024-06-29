import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class GroupDetail extends Model {
    static associate() {}
  }

  GroupDetail.init(
    {
      group_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Example of a unique constraint
      },
      group_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "GroupDetail",
      tableName: "groupDetail",
      underscored: true, // Use underscores in the table name (e.g., group_detail)
      timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
  );

  return GroupDetail;
};
