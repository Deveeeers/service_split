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
        defaultValue: 0,
      },
      total_lend: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      total_expense: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      total_payment: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
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
