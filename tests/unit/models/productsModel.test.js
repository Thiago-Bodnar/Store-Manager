const sinon = require('sinon');
const { expect } = require('chai');
const db = require('../../../models/db');
const productsModel = require('../../../models/productsModel');

describe('productsModel', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('/:id',() => { 
    it('Quando existe, retorna um objeto com as informações corretas', async () => {     
      sinon.stub(db, 'query').resolves([[{ id: 1, name: 'Martelo de Thor' }]]);

      const product = await productsModel.get(1);

      expect(product).to.be.an('object').and.to.have.property('id', 1);
    });
    it('Quando não existe, retorna mensagem de não encontrado', async () => {
      sinon.stub(db, 'query').resolves([[{ message: 'Product not found' }]]);

      const error = await productsModel.get(69);
      
      expect(error).to.be.an('object').and.to.have.property('message', 'Product not found');
    });
  });
});