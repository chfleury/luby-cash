import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from 'crypto'
import moment from 'moment'
import { DateTime } from 'luxon'

import Admin from 'App/Models/Admin'

export default class ForgotPasswordController {
  public async generateTokenAdmin({ request }: HttpContextContract) {
    // await request.validate(EmailValidator)
    const { email } = request.body()

    const admin = await Admin.findByOrFail('email', email)

    admin.token = crypto.randomBytes(10).toString('hex')
    admin.tokenCreatedAt = DateTime.now()

    await admin.save()

    return { token: admin.token }

    // await new ForgotPasswordMailer(user).sendLater()
  }

  public async updatePasswordAdmin({ request, response }: HttpContextContract) {
    // await request.validate(UserValidator)

    try {
      const { token, password } = request.body()

      const admin = await Admin.findByOrFail('token', token)

      const tokenExpired = moment().subtract('15', 'days').isAfter(admin.tokenCreatedAt)

      if (tokenExpired) {
        return response.status(401).send({ error: 'Token expirado' })
      }

      admin.token = null
      admin.tokenCreatedAt = null
      admin.password = password

      await admin.save()
      return admin
    } catch (error) {
      return { error: 'Please retry with valid token (the token expires in 15 days)' }
    }
  }
}
