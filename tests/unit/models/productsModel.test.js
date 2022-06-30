const sinon = require('sinon');
const { expect } = require('chai');
const db = require('../../../models/db');
const productsModel = require('../../../models/productsModel');

describe('productsModel', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('list', () => {
    it('Lista corretamente os itens', async () => {
      const list = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      sinon.stub(db, 'query').resolves([[
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' }, 
      ]]);

      const getList = await productsModel.list();

      expect(getList).to.be.deep.eq(list);
    });
  });

  describe('get',() => { 
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

    describe('add', () => {
      it('Ao receber um valor name, salva o dado no banco e retorna o id', async () => {
        const expectedId = 1;

        sinon.stub(db, 'query').resolves([{ insertId: expectedId }]);

        const id = await productsModel.add({ name: 'Capa da invisibilidade' });

        expect(id).to.be.eq(expectedId);
      });
    });
  });
});