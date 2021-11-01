import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordMailer extends BaseMailer {
  constructor(private user: { email; token }) {
    super()
  }

  public prepare(message: MessageContract) {
    message
      .from('prova@example.com')
      .to(this.user.email)
      .subject('Redefinição de senha')
      .htmlView('emails/forgot_password', { email: this.user.email, token: this.user.token })
  }
}
