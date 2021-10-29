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

    return this;
  }

  //   static associate(models) {
  //     this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  //   }
}
module.exports = Client;
