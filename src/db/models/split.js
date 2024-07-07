import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Split extends Model {
    /**
     *
     */
    static associate() {}
  }

  Split.init(
    {
      expense_id: {
        type: DataTypes.INTEGER,
      },
      owe_by_id: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: 'Split',
      tableName: 'split',
      underscored: true,
      timestamps: true,
    },
  );
  return Split;
};
