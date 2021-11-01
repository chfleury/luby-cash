import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sender_cpf: string

  @column()
  public receiver_cpf: string

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
