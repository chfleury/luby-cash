import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    guard: keyof GuardsList
  ) {
    guard = 'apiAdmin'
    if (guard === auth.name) {
      await next()
    }
  }
}
