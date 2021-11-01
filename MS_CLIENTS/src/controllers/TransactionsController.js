// const Mailer = require('../Mailer/Mailer');
const Client = require('../models/Clients');
// const { Op } = require('sequelize');
// const moment = require('moment');

class TransactionsController {
  async newTransaction(req, res) {
    const { senderCpf, receiverCpf, value } = req.body;

    const sender = await Client.findOne({ where: { cpfNumber: senderCpf } });

    const receiver = await Client.findOne({
      where: { cpfNumber: receiverCpf },
    });

    if (sender.status && receiver.status) {
      if (sender.currentBalance >= value) {
        sender.currentBalance -= value;
        receiver.currentBalance += value;

        await sender.save();
        await receiver.save();
        return res.json({ sucess: 'PIX done' });
      }

      return res.status(400).json({ error: 'Insuficient balance' });
    }

    return res.status(400).json({ error: 'Clients not aproved or inexistent' });
  }
}

module.exports = new TransactionsController();
