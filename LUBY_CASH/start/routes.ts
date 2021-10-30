import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('admins', 'AdminsController.store').middleware('auth').middleware('isAdmin')

Route.post('clients', 'ClientsController.store')

Route.post('login_admin', 'AuthController.loginAdmin')
Route.post('login_client', 'AuthController.loginClient')
