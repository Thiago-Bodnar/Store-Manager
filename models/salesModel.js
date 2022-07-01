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

};

module.exports = salesModel;