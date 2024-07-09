module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(`expense`, {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      expense_ulid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
      },
      group_id: {
        type: Sequelize.STRING,
        references: {
          model: `groupDetail`,
          key: `uuid`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      paid_by_id: {
        type: Sequelize.STRING,
        references: {
          model: `user`,
          key: `ulid`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.FLOAT, // Corrected to Sequelize.FLOAT for numeric values
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
    await queryInterface.dropTable(`expense`);
  },
};
