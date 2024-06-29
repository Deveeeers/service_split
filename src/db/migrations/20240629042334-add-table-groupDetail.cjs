"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("groupDetail", {
      group_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      group_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add additional operations if needed
    // Example: await queryInterface.addIndex('groupDetail', ['group_name']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("groupDetail");
  },
};
