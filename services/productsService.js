const Joi = require('joi');
const { runSchema } = require('./validators');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableError = require('../errors/UnprocessableError');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  checkNameLength({ name }) {
    if (name.length < 5) {
      throw new UnprocessableError('"name" length must be at least 5 characters long');
    }
  },

  async search(query) {
    const products = await productsModel.list();
    if (!query) return products;

    const filteredProducts = products
      .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));

    return filteredProducts;
  },

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

  async add(data) {
    const id = await productsModel.add(data);
    return id;
  },

  async edit(changes, id) {
    if (Object.keys(changes).length) {
      await productsModel.edit(changes, id);
    }
  },

  async delete(id) {
    await productsModel.delete(id);
  },
};

module.exports = productsService;
