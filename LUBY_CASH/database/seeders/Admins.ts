import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    await Admin.create({
      email: 'admin@admin.com',
      password: 'admin',
      cpf: '12312312312',
      fullName: 'Adm Adm',
      phone: '61992241819',
    })
  }
}
