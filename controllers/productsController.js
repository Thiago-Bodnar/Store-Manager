const productsService = require('../services/productsService');

const productsController = {
  async listProducts(_req, res) {
    const products = await productsService.list();
    res.status(200).json(products);
  },
};

module.exports = productsController;