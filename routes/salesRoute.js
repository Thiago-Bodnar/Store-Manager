const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.post('/', asyncHandler(salesController.add));
salesRoute.get('/', asyncHandler(salesController.list));
salesRoute.get('/:id', asyncHandler(salesController.get));
salesRoute.delete('/:id', asyncHandler(salesController.delete));
salesRoute.put('/:id', asyncHandler(salesController.edit));

module.exports = salesRoute;