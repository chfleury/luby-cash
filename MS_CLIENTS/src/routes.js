const { Router } = require('express');

const ClientsController = require('./controllers/ClientsController');
const TransactionsController = require('./controllers/TransactionsController');

const routes = new Router();

routes.get('/clients', ClientsController.index);
routes.post('/pix', TransactionsController.newTransaction);

module.exports = routes;
