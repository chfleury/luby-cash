const { Kafka } = require('kafkajs');
const ClientsController = require('../controllers/ClientsController');

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

        await ClientsController.store(jsonMessage);
      },
    });
  }
}

module.exports = Consumer;
