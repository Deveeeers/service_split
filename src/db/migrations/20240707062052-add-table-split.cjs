module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(`split`, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      expense_id: {
        type: Sequelize.INTEGER,
        references: {
          model: `expense`,
          key: `id`,
        },
      },
      owe_by_id: {
        type: Sequelize.STRING,
        references: {
          model: `user`,
          key: `ulid`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
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
    await queryInterface.dropTable(`split`);
  },
};
