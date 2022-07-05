const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');

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
    
  async delete(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkIfExists(id);
    await salesService.delete(id);

    res.sendStatus(204);
  },
  
  async edit(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    const changes = req.body;
    await salesService.checkIfExists(id);
    changes.forEach((sale) => salesService.validateBody(sale));
    changes.forEach((sale) => salesService.checkQuantity(sale.quantity));
    await salesService.checkIfProductsExists(changes);
    const oldProductIds = await salesModel.getProductIdsBySale(id);
    const update = await salesService.edit(changes, id, oldProductIds);

    res.status(200).json(update);
  },
};

module.exports = salesController;