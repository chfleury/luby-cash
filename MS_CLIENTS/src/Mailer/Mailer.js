const nodemailer = require('nodemailer');

class Mailer {
  async sendMail(obj) {
    try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'fd17ee4a5e3f27',
          pass: '08e6f169b88edc',
        },
      });

      let info = await transporter.sendMail(obj);

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Mailer();
