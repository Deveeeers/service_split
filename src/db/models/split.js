import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Split extends Model {
    /**
     *
     */
    static associate() {}
  }

  Split.init(
    {
      split_id: {
        type: DataTypes.STRING,
      },
      expense_id: {
        type: DataTypes.STRING,
      },
      owe_by_id: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: "Split",
      tableName: "split",
      underscored: true,
      timestamps: true,
    }
  );
  return Split;
};
