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
  });

  describe('add', () => {
    it('Ao receber um valor name, salva o dado no banco e retorna o id', async () => {
      const expectedId = 1;

      sinon.stub(db, 'query').resolves([{ insertId: expectedId }]);

      const id = await productsModel.add({ name: 'Capa da invisibilidade' });

      expect(id).to.be.eq(expectedId);
    });
  });
  
  describe('exists', () => {
    it('Se o id informado existe, retorna true', async () => {
      sinon.stub(db, 'query').resolves([[true]])

      const exists = await productsModel.exists(1);

      expect(exists).to.be.true;
    });

    it('Se o id informado não existe, retorna false', async () => {
      sinon.stub(db, 'query').resolves([[false]])

      const exists = await productsModel.exists(1406);

      expect(exists).to.be.false;
    });
  });

  describe('getIds', () => {
    it('Retorna um array com os ids dos produtos cadastrados', async () => {
      sinon.stub(db, 'query').resolves([[
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' }, 
      ]]);

      const ids = await productsModel.getIds();

      expect(ids).to.be.an('array').and.to.deep.eq([1, 2, 3]);
    });
  });
});