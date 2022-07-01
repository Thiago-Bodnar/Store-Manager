const Joi = require('joi');
const { runSchema } = require('./validators');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');
const UnprocessableError = require('../errors/UnprocessableError');

const salesService = {
  validateBody: runSchema(
    Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ),

  checkQuantity(quantity) {
    if (Math.sign(quantity) === -1 || quantity < 1) {
      throw new UnprocessableError('"quantity" must be greater than or equal to 1');
    }
  },

  async checkIfProductsExists(data) {
    const ids = await productsModel.getIds();
    const check = data
      .every((sale) => ids.includes(sale.productId));
    if (!check) {
      throw new NotFoundError('Product not found');
    }
  },

  async add(data) {
    const sale = salesModel.add(data);
    return sale;
  },

  async list() {
    const list = salesModel.list();
    return list;
  },

  serialize(data) {
    return ({
      saleId: data.sale_id,
      date: data.date,
      productId: data.product_id,
      quantity: data.quantity,
    });
  },
};

module.exports = salesService;