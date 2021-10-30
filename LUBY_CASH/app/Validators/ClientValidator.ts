import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.confirmed()]),
    full_name: schema.string(),
    phone: schema.string(),
    cpf_number: schema.string(),
    address: schema.string(),
    city: schema.string(),
    state: schema.string(),
    zipcode: schema.string(),
    average_salary: schema.number(),
  })

  public messages = {}
}
