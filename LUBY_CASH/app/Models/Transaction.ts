import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sender_cpf: string

  @column()
  public reciever_cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
