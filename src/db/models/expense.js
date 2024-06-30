import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     *
     */
    static associate() {}
  }

  Expense.init(
    {
      expense_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
      },
      group_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paid_by_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Expense",
      tableName: "expense",
      underscored: true,
      timestamps: true,
    }
  );
  return Expense;
};
