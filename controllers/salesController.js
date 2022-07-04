const salesService = require('../services/salesService');

const salesController = {
  async add(req, res) {
    const data = req.body;
    data.forEach((sale) => salesService.validateBody(sale));
    data.forEach((sale) => salesService.checkQuantity(sale.quantity));
    await salesService.checkIfProductsExists(data);
    const sale = await salesService.add(data);

    res.status(201).json(sale);
  },

  async list(_req, res) {
    const sales = await salesService.list();
    const formatedData = sales.map(salesService.serialize);
    res.status(200).json(formatedData);
  },

    async get(req, res) {
      const { id } = await salesService.validateParamsId(req.params);
      await salesService.checkIfExists(id);
      const sale = await salesService.get(id);
      const formatedSale = sale.map(salesService.serialize);

      res.status(200).json(formatedSale);
  },
};

module.exports = salesController;