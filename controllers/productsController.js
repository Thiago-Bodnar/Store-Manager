const productsService = require('../services/productsService');

const productsController = {
  async list(_req, res) {
    const products = await productsService.list();
    res.status(200).json(products);
  },

  async get(req, res) {
      const { id } = await productsService.validateParamsId(req.params);
      await productsService.checkIfExists(id);
      const product = await productsService.get(id);

      res.status(200).json(product);
  },

  async add(req, res) {
    const data = await productsService.validateBodyAdd(req.body);
    productsService.checkNameLength(data);
    const id = await productsService.add(data);
    const product = await productsService.get(id);

    res.status(201).json(product);
  },
};

module.exports = productsController;