module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(`groupDetail`, {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      group_name: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable(`groupDetail`);
  },
};
