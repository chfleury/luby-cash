import Transaction from 'App/Models/Transaction'
import { Kafka } from 'kafkajs'

export default class Consumer {
  private consumer
  private kafka
  constructor() {
    this.kafka = new Kafka({
      brokers: ['localhost:9092'],
    })

    this.consumer = this.kafka.consumer({ groupId: 'group2' })
  }

  public async consume({ topic, fromBeginning, cpfNumber }) {
    await this.consumer.connect()

    await this.consumer.subscribe({ topic, fromBeginning })

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const jsonMessage = JSON.parse(message.value.toString())

        console.log(jsonMessage)
        if (jsonMessage.cpfNumber === cpfNumber) {
          if (jsonMessage.status) {
            await Transaction.create({
              sender_cpf: 'boas-vindas-luby-cash',
              receiver_cpf: jsonMessage.cpfNumber,
              value: 200,
            })
          }
          await this.consumer.disconnect()
        }
      },
    })
  }
}
