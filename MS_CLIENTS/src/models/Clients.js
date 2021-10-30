const { Sequelize, Model } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        fullName: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        cpfNumber: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        currentBalance: Sequelize.DOUBLE,
        averageSalary: Sequelize.DOUBLE,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async (client) => {
      if (client.averageSalary >= 500) {
        client.status = true;
        client.currentBalance = 200;
      } else {
        client.status = false;
        client.currentBalance = 0;
      }
    });

    return this;
  }
}
module.exports = Client;
