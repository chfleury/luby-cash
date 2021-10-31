import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

import KafkaProducer from 'App/KafkaService/producer'
import User from 'App/Models/User'
import ClientValidator from 'App/Validators/ClientValidator'

export default class ClientsController {
  public async index({ request, response }: HttpContextContract) {
    const { status, date } = request.qs()

    const url = `http://localhost:3000/clients?status=${status}&date=${date}`
    console.log(url)
    const res = await axios({
      url,
      method: 'get',
    })

    if (res.status === 200) {
      response.send(res.data)
    } else {
      response.status(500).send({ error: 'unexpected error' })
    }
  }

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
          }),
        },
      ],
    })

    const user = await User.create({ password, email })

    return response.send(user)
  }
}
