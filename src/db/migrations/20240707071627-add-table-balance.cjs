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
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      another_user_id: {
        type: Sequelize.STRING,
        references: {
          model: `user`,
          key: `ulid`,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
