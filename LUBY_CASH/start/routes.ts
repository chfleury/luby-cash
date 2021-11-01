import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('admins', 'AdminsController.store').middleware('auth').middleware('isAdmin')

Route.post('clients', 'ClientsController.store')
Route.get('clients', 'ClientsController.index')

Route.post('login_admin', 'AuthController.loginAdmin')
Route.post('login_client', 'AuthController.loginClient')

Route.post('pix', 'TransactionsController.store')
