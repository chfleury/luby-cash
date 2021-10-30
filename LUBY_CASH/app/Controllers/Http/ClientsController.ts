import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import KafkaProducer from 'App/KafkaService/producer'

import User from 'App/Models/User'

import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(ClientValidator)
    const producer = new KafkaProducer()

    const {
      email,
      password,

      full_name: fullName,
      cpf_number: cpfNumber,
      phone,
      zipcode,
      city,
      state,
      address,
      current_balance: currentBalance,
      average_salary: averageSalary,
    } = request.body()

    await producer.produce({
      topic: 'new-client',
      messages: [
        {
          value: JSON.stringify({
            email,
            averageSalary,
            address,
            zipcode,
            cpfNumber,
            fullName,
            phone,
            city,
            state,
            currentBalance,
          }),
        },
      ],
    })

    const user = await User.create({ password, email })

    return response.send(user)
  }
}
