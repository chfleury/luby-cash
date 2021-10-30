import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public async loginAdmin({ auth, request, response }: HttpContextContract) {
    await request.validate(LoginValidator)

    const { email, password } = request.body()

    try {
      const token = await auth.use('apiAdmin').attempt(email, password)

      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async loginClient({ auth, request, response }: HttpContextContract) {
    await request.validate(LoginValidator)

    const { email, password } = request.body()

    try {
      const token = await auth.use('apiUser').attempt(email, password)

      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
