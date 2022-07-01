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
};

module.exports = salesController;