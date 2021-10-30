const Client = require('../models/Clients');

class ClientsController {
  async store(data) {
    try {
      const client = await Client.create(data);
      console.log(client);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = new ClientsController();
