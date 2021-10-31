const Mailer = require('../Mailer/Mailer');
const Client = require('../models/Clients');

class ClientsController {
  async store(data) {
    try {
      const client = await Client.create(data);
      console.log(client);

      if (client.status) {
        const data = {
          from: '"Prova Luby Cash" <prova@example.com>', // sender address
          to: adminEmails.join(', '), // list of receivers
          subject: 'Você acaba de ser aprovado na Luby Cash!', // Subject line
          text: `Olá ${client.fullName}!\n
          Seu status no nosso sistema agora é APROVADO. \n
          Como um presente de boas vindas, você receberá R$200,00 na sua conta!`, // plain text body
          html: `<b><h2>Olá ${client.fullName}!</h2><br><br>
          Seu status no nosso sistema agora é APROVADO. <br>
          Como um presente de boas vindas, você receberá <strong>R$200,00</strong> na sua conta!
          </b>`,
        };

        await Mailer.sendMail(data);
      } else {
        const data = {
          from: '"Prova Luby Cash" <prova@example.com>', // sender address
          to: adminEmails.join(', '), // list of receivers
          subject: 'Infelizemente você foi reprovado.', // Subject line
          text: `Olá ${client.fullName}, \n
        Seu status no nosso sistema é REPROVADO. \n
        O sistema não aceitará novas solicitações do cpf ${client.cpfNumber}.`, // plain text body
          html: `<b><h2>Olá ${client.fullName},</h2><br><br>
        Seu status no nosso sistema é REPROVADO. <br>
        O sistema não aceitará novas solicitações do cpf ${client.cpfNumber}.
        </b>`,
        };

        await Mailer.sendMail(data);
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = new ClientsController();
