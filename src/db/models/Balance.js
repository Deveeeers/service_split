import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     *
     */
    static associate() {}
  }

  Balance.init(
    {
      balancesheet_id: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.STRING,
      },
      another_user_id: {
        type: DataTypes.STRING,
      },
      lent_money: {
        type: DataTypes.FLOAT,
      },
      owe_money: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: 'Balance',
      tableName: 'balance',
      underscored: true,
      timestamps: true,
    },
  );
  return Balance;
};
