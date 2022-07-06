const sinon = require('sinon');
const { expect } = require('chai');
const db = require('../../../models/db');
const salesModel = require('../../../models/salesModel');

describe('salesModel', () => {
  beforeEach(() => {
  sinon.restore();
  });

  describe('list', () => {
  it('Lista corretamente os itens', async () => {
    const list = [
      { saleId: 1, date: '2022-07-05T18:04:20.000Z', productId: 1, quantity: 1 },
      { saleId: 1, date: '2022-07-05T18:04:20.000Z', productId: 2, quantity: 5 },
      { saleId: 2, date: '2022-07-05T18:04:20.000Z', productId: 1, quantity: 10 },
    ];

    sinon.stub(db, 'query').resolves([[
      { saleId: 1, date: '2022-07-05T18:04:20.000Z', productId: 1, quantity: 1 },
      { saleId: 1, date: '2022-07-05T18:04:20.000Z', productId: 2, quantity: 5 },
      { saleId: 2, date: '2022-07-05T18:04:20.000Z', productId: 1, quantity: 10 },
    ]]);

    const getList = await salesModel.list();

    expect(getList).to.be.deep.eq(list);
    });
  });

    describe('get',() => { 
    it('Quando existe, retorna um objeto com as informações corretas', async () => {     
      sinon.stub(db, 'query').resolves([[
        { saleId: 1, date: '2022-07-05T18:04:20.000Z', productId: 1, quantity: 1 },
        { saleId: 1, date: '2022-07-05T18:04:20.000Z', productId: 2, quantity: 5 },
      ]]);

      const product = await salesModel.get(1);

      expect(product).to.be.an('array').and.to.have.length(2);
    });

    it('Quando não existe, retorna mensagem de não encontrado', async () => {
      sinon.stub(db, 'query').resolves([{ message: 'Sale not found' }]);

      const error = await salesModel.get(69);
      
      expect(error).to.be.an('object').and.to.have.property('message', 'Sale not found');
    });
  });
});