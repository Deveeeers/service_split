/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(`balance`, {
      balancesheet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: `balancesheet`,
          key: `balancesheet_id`,
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: `user`,
          key: `id`,
        },
      },
      another_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: `user`,
          key: `id`,
        },
      },
      lent_money: {
        type: Sequelize.INTEGER,
      },
      owe_money: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(`CURRENT_TIMESTAMP`),
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(`balance`);
  },
};
