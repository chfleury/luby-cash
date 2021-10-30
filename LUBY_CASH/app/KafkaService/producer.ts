import { Kafka } from 'kafkajs'

export default class Producer {
  private producer
  constructor() {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
    })

    this.producer = kafka.producer()
  }

  public async produce({ topic, messages }) {
    await this.producer.connect()

    const data = {
      topic,
      messages,
    }
    console.log(data)
    await this.producer.send(data)

    await this.producer.disconnect()
  }
}
