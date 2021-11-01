import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import crypto from 'crypto'
import moment from 'moment'
import { DateTime } from 'luxon'

import Admin from 'App/Models/Admin'
import EmailValidator from 'App/Validators/EmailValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import ForgotPasswordMailer from 'App/Mailers/ForgotPasswordMailer'
import User from 'App/Models/User'

export default class ForgotPasswordController {
  public async generateTokenAdmin({ request }: HttpContextContract) {
    await request.validate(EmailValidator)
    const { email } = request.body()

    const admin = await Admin.findByOrFail('email', email)

    admin.token = crypto.randomBytes(10).toString('hex')
    admin.tokenCreatedAt = DateTime.now()

    await admin.save()

    await new ForgotPasswordMailer({ token: admin.token, email }).sendLater()

    return { token: admin.token }
  }

  public async updatePasswordAdmin({ request, response }: HttpContextContract) {
    // await request.validate(LoginValidator)

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

  public async generateTokenUser({ request }: HttpContextContract) {
    await request.validate(EmailValidator)
    const { email } = request.body()

    const user = await User.findByOrFail('email', email)

    user.token = crypto.randomBytes(10).toString('hex')
    user.tokenCreatedAt = DateTime.now()

    await user.save()

    await new ForgotPasswordMailer({ token: user.token, email }).sendLater()

    return { token: user.token }
  }

  public async updatePasswordUser({ request, response }: HttpContextContract) {
    // await request.validate(LoginValidator)

    try {
      const { token, password } = request.body()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment().subtract('15', 'days').isAfter(user.tokenCreatedAt)

      if (tokenExpired) {
        return response.status(401).send({ error: 'Token expirado' })
      }

      user.token = null
      user.tokenCreatedAt = null
      user.password = password

      await user.save()
      return user
    } catch (error) {
      return { error: 'Please retry with valid token (the token expires in 15 days)' }
    }
  }
}
