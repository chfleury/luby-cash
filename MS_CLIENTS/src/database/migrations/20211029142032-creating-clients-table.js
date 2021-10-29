'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
      },
      cpf_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        unique: true,
      },
      city: {
        type: Sequelize.STRING,
        unique: true,
      },
      state: {
        type: Sequelize.STRING,
        unique: true,
      },
      zipcode: {
        type: Sequelize.STRING,
        unique: true,
      },
      currente_balance: {
        type: Sequelize.DOUBLE,
        unique: true,
      },
      average_salary: {
        type: Sequelize.DOUBLE,
        unique: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        unique: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clients');
  },
};
