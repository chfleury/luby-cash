const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Client = require('../models/Clients');

const models = [Client];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) =>
        model.associate ? model.associate(this.connection.models) : null
      );
  }
}

module.exports = new Database();
