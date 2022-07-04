const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', asyncHandler(productsController.list));
productsRoute.get('/:id', asyncHandler(productsController.get));
productsRoute.post('/', asyncHandler(productsController.add));
productsRoute.put('/:id', asyncHandler(productsController.edit));

module.exports = productsRoute;