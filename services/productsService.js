// const Joi = require('joi');
// const { runSchema } = require('./validators');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  async checkIfExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) {
      throw new NotFoundError('"Product" not found');
    }
  },
  async list() {
    const products = await productsModel.list();
    return products;
  },
};

module.exports = productsService;
