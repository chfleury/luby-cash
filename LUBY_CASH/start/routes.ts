import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
  .middleware('auth')
  .middleware('isAdmin')

Route.post('admins', 'AdminsController.store')
Route.post('login_admin', 'AuthController.loginAdmin')
Route.post('login_client', 'AuthController.loginClient')
