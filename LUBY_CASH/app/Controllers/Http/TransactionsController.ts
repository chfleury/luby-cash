import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import axios from 'axios'

export default class TransactionsController {
  public async store({ request, response }: HttpContextContract) {
    const { senderCpf, receiverCpf, value } = request.body()

    const url = `http://localhost:3000/pix`
    console.log(url)
    const res = await axios({
      url,
      method: 'post',
      data: {
        senderCpf,
        receiverCpf,
        value,
      },
    })

    if (res.status === 200) {
      const pix = await Transaction.create({
        sender_cpf: senderCpf,
        receiver_cpf: receiverCpf,
        value,
      })

      return response.send(pix)
    } else {
      return response.status(400).send(res.data)
    }
  }
}
