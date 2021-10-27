import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async loginAdmin({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body()

    try {
      const token = await auth.use('apiAdmin').attempt(email, password)

      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
