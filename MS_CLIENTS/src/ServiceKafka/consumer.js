const { Kafka } = require('kafkajs');

class Consumer {
  constructor() {
    this.kafka = new Kafka({
      brokers: ['localhost:9092'],
    });

    this.consumer = this.kafka.consumer({ groupId: 'group' });
  }

  async consume({ topic, fromBeginning }) {
    await this.consumer.connect();

    await this.consumer.subscribe({ topic, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const jsonMessage = JSON.parse(message.value.toString());

        // console.log(jsonMessage.userEmail);

        await Mailer.sendMail(jsonMessage);
      },
    });
  }
}

module.exports = Consumer;
