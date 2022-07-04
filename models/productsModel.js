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

  async add(data) {
    const sql = `
    INSERT INTO  StoreManager.products (name)
    VALUES (?)`;

    const [{ insertId }] = await db.query(sql, [data.name]);
    return insertId;
  },

  async getIds() {
    const sql = `
    SELECT id FROM StoreManager.products;
    `;
    const [ids] = await db.query(sql);
    const formatIds = ids.map((id) => id.id);
    
    return formatIds;
  },

    async edit(changes, id) {
    const sql = `
    UPDATE StoreManager.products
    SET ?
    WHERE id = ?;`;

    await db.query(sql, [changes, id]);
    },
};

module.exports = productsModel;