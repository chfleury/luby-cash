import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import AdminValidator from 'App/Validators/AdminValidator'

export default class AdminsController {
  public async store({ request, response }: HttpContextContract) {
    await request.validate(AdminValidator)

    const { full_name: fullName, password, cpf_number: cpf, phone, email } = request.body()
    const admin = await Admin.create({ fullName, password, cpf, phone, email })

    return response.send(admin)
  }
}
