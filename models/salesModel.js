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
};

module.exports = salesModel;