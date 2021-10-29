const Client = require('../models/Clients');

class ClientsController {
  async store(data) {
    try {
      await Client.create(data);
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = new ClientsController();
