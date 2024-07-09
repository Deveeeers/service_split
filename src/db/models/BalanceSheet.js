import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Balancesheet extends Model {
    /**
     *
     */
    static associate() {}
  }

  Balancesheet.init(
    {
      user_id: {
        type: DataTypes.STRING,
      },
      total_owe: {
        type: DataTypes.FLOAT,
      },
      total_lend: {
        type: DataTypes.FLOAT,
      },
      total_expense: {
        type: DataTypes.FLOAT,
      },
      total_payment: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: 'Balancesheet',
      tableName: 'balancesheet',
      underscored: true,
      timestamps: true,
    },
  );
  return Balancesheet;
};
