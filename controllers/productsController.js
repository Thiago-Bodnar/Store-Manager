const productsService = require('../services/productsService');

const productsController = {
  async list(_req, res) {
    const products = await productsService.list();
    res.status(200).json(products);
  },

  async get(req, res, next) {
    try {
      const { id } = await productsService.validateParamsId(req.params);
      await productsService.checkIfExists(id);
      const product = await productsService.get(id);

      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = productsController;