const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.post('/', asyncHandler(salesController.add));
salesRoute.get('/', asyncHandler(salesController.list));

module.exports = salesRoute;