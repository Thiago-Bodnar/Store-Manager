const Joi = require('joi');
const { runSchema } = require('./validators');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  async checkIfExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) {
      throw new NotFoundError('Product not found');
    }
  },

  async list() {
    const products = await productsModel.list();
    return products;
  },

  async get(id) {
    const product = await productsModel.get(id);
    return product;
  },

};

module.exports = productsService;
