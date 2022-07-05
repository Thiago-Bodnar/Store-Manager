const db = require('./db');

const salesModel = {
  async add(data) {
    const [{ insertId }] = await db.query(`
    INSERT INTO StoreManager.sales(date)
    VALUES (NOW());`);
    
    const sql = `
      INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
      VALUES (?, ?, ?);
    `;

    await data
      .forEach((sale) => db.query(sql, [insertId, sale.productId, sale.quantity]));

    return ({ id: insertId, itemsSold: data });
  },

  async edit(changes, saleId, oldProductIds) {
    const sql = `
      UPDATE StoreManager.sales_products 
      SET 
        product_id = ?,
        quantity = ?
      WHERE sale_id = ? AND product_id = ?;
    `;

    await changes
      .forEach((sale, index) => db.query(sql, [
        sale.productId, sale.quantity, saleId, oldProductIds[index]]));
    
    return ({
      saleId,
      itemsUpdated: changes,
    });
  },

    async list() {
      const sql = `
    SELECT 
      sale_id, date, product_id, quantity
    FROM
      StoreManager.sales AS A
    INNER JOIN
      StoreManager.sales_products AS B ON A.id = B.sale_id;
    `;

    const [products] = await db.query(sql);
    return products;
  },

  async get(id) {
    const sql = `
    SELECT 
      date, product_id, quantity
    FROM
      StoreManager.sales AS A
    INNER JOIN
      StoreManager.sales_products AS B ON A.id = B.sale_id
    WHERE
      id = (?);
    `;
    const [product] = await db.query(sql, [id]);

    return product;
  },

    async exists(id) {
    const sql = `
      SELECT *
      FROM StoreManager.sales
      WHERE id = ?
    `;
    const [[exists]] = await db.query(sql, [id]);
    return !!exists;
  },
  
  async delete(id) {
    const sql = `
    DELETE FROM StoreManager.sales
    WHERE id = ?;`;

    await db.query(sql, [id]);
  },
  
  async getProductIdsBySale(id) {
    const sql = `
      SELECT 
          product_id
      FROM
          StoreManager.sales_products
      WHERE
          sale_id = ?;
    `;

    const [sales] = await db.query(sql, [id]);
    const ids = sales.map((sale) => sale.product_id);
    return ids;
  },
};

module.exports = salesModel;