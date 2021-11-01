const Mailer = require('../Mailer/Mailer');
const Client = require('../models/Clients');
const Producer = require('../ServiceKafka/producer');

const { Op } = require('sequelize');
const moment = require('moment');

class ClientsController {
  async index(req, res) {
    const { status, date } = req.query;

    if (date == 'undefined' || date == null) {
      const clients = await Client.findAll({
        where: {
          status,
        },
      });

      return res.json(clients);
    }

    const dateStart = moment(date, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const dateEnd = moment(date, 'MM-DD-YYYY')
      .add(1, 'days')
      .format('YYYY-MM-DD');

    const clients = await Client.findAll({
      where: {
        status,
        createdAt: {
          [Op.between]: [dateStart, dateEnd],
        },
      },
    });

    return res.json(clients);
  }

  async store(data) {
    const client = await Client.create(data);

    var data = {};
    if (client.status) {
      data = {
        from: '"Prova Luby Cash" <prova@example.com>', // sender address
        to: client.email,
        subject: 'Você acaba de ser aprovado na Luby Cash!', // Subject line
        text: `Olá ${client.fullName}!\n
          Seu status no nosso sistema agora é APROVADO. \n
          Como um presente de boas vindas, você receberá R$200,00 na sua conta!`, // plain text body
        html: `<b><h2>Olá ${client.fullName}!</h2><br><br>
          Seu status no nosso sistema agora é APROVADO. <br>
          Como um presente de boas vindas, você receberá <strong>R$200,00</strong> na sua conta!
          </b>`,
      };
    } else {
      data = {
        from: '"Prova Luby Cash" <prova@example.com>', // sender address
        to: client.email,
        subject: 'Infelizmente você foi reprovado.', // Subject line
        text: `Olá ${client.fullName}, \n
        Seu status no nosso sistema é REPROVADO. \n
        O sistema não aceitará novas solicitações do cpf ${client.cpfNumber}.`, // plain text body
        html: `<b><h2>Olá ${client.fullName},</h2><br><br>
        Seu status no nosso sistema é REPROVADO. <br>
        O sistema não aceitará novas solicitações do cpf ${client.cpfNumber}.
        </b>`,
      };
    }

    await Mailer.sendMail(data);

    const kafkaproducer = new Producer();

    console.log(client.cpfNumber);
    await kafkaproducer.produce({
      topic: 'client-status',
      messages: [
        {
          value: JSON.stringify({
            status: client.status,
            cpfNumber: client.cpfNumber,
          }),
        },
      ],
    });
  }
}

module.exports = new ClientsController();
