const db = require('./db');

const productsModel = {
  async list() {
    const sql = `
    SELECT *
    FROM StoreManager.products`;

    const [products] = await db.query(sql);
    return products;
  },

  async get(id) {
    const sql = `
    SELECT *
    FROM StoreManager.products
    WHERE id = ?
    `;
    const [[product]] = await db.query(sql, [id]);
    return product;
  },

  async exists(id) {
        const sql = `
    SELECT *
    FROM StoreManager.products
    WHERE id = ?
    `;
    const [[exists]] = await db.query(sql, [id]);
    return !!exists;
  },
};

module.exports = productsModel;