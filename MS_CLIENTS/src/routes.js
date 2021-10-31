const { Router } = require('express');

const ClientsController = require('./controllers/ClientsController');

const routes = new Router();

routes.get('/clients', ClientsController.index);

module.exports = routes;
