module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(`balancesheet`, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: `user`,
          key: `ulid`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      total_lend: {
        type: Sequelize.FLOAT,
      },
      total_owe: {
        type: Sequelize.FLOAT,
      },
      total_payment: {
        type: Sequelize.FLOAT,
      },
      total_expense: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable(`balancesheet`);
  },
};
