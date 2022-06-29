const db = require('./db');

const productsModel = {
  async list() {
    const sql = `
    SELECT *
    FROM StoreManager.products`;

    const [products] = await db.query(sql);
    return products;
  },
};

module.exports = productsModel;