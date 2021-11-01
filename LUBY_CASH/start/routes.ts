import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('admins', 'AdminsController.store').middleware('auth').middleware('isAdmin')

Route.post('clients', 'ClientsController.store')
Route.get('clients', 'ClientsController.index')

Route.post('login_admin', 'AuthController.loginAdmin')
Route.post('login_client', 'AuthController.loginClient')
Route.post('forgot_password_admin', 'ForgotPasswordController.generateTokenAdmin')
Route.post('forgot_password_client', 'ForgotPasswordController.generateTokenUser')

Route.put('update_password_admin', 'ForgotPasswordController.updatePasswordAdmin')
Route.put('update_password_client', 'ForgotPasswordController.updatePasswordUser')

Route.post('pix', 'TransactionsController.store')

Route.get('transactions/:cpf', 'TransactionsController.index')
