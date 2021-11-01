const { Kafka } = require('kafkajs');
class Producer {
  constructor() {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
    });

    this.producer = kafka.producer();
  }

  async produce({ topic, messages }) {
    await this.producer.connect();

    const data = {
      topic,
      messages,
    };

    await this.producer.send(data);

    await this.producer.disconnect();
  }
}

module.exports = Producer;
