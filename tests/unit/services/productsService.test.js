const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const UnprocessableError = require('../../../errors/UnprocessableError');
const chaiAsPromised = require('chai-as-promised');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

use(chaiAsPromised);

describe('productsService', () => { 
  describe('validateParamsId', () => { 
    it('Se recebe um id válido, retorna o mesmo', () => { 
      const id = productsService.validateParamsId({ id: 1 });

      expect(id).to.be.deep.eq({ id: 1 });
    });

    it('Se recebe um id inválido, dispara um erro', () => { 
      expect(() => productsService.validateParamsId({ id: 'teste' })).to
        .throws('"id" must be a number');
    });
      });

  describe('checkNameLength', () => {
    it('Dispara um UnprocessableError caso name não tenha 5 caracteres', () => {
      const data = { name: 'Aoba' }
      expect(() => productsService.checkNameLength(data))
        .to.throws('"name" length must be at least 5 characters long');
      });
  });

  describe('list', () => {
    it('Retorna um array com todos os itens da tabela', async () => {
      const list = [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ];

  sinon.stub(productsModel, 'list').resolves([
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' }, 
  ]);

  const getList = await productsService.list();

  expect(getList).to.be.deep.eq(list);
    });
  });

  describe('get', () => {
    it('Retorna um objeto com as informações referentes ao id passado', async () => {
      const expectedObject = { id: 1, name: 'Martelo de Thor' }
      sinon.stub(productsModel, 'get').resolves({ id: 1, name: 'Martelo de Thor' });

    const product = await productsService.get(1);

    expect(product).to.be.deep.eq(expectedObject);
    });
  });
    
  describe('add', () => {
      it('Retorna o id produto adicionado', async () => {
        const expectedId = 1;
        const expectedObject = { insertId: 1 };

        sinon.stub(productsModel, 'add').resolves({ insertId: expectedId });

        const id = await productsService.add({ name: 'Capa da invisibilidade' });

        expect(id).to.be.deep.eq(expectedObject);
      });
  });

  describe('validateBodyAdd', () => {
    it('Se o name for válido, retorna o mesmo',  () => {
      const body = { name: 'Capa da Invisibilidade' }

      const check =  productsService.validateBodyAdd(body);

      expect(check).to.be.deep.eq({ name: 'Capa da Invisibilidade' });
    });

       it('Se recebe um name inválido, dispara um erro', () => { 
      expect(() => productsService.validateBodyAdd({ name: 1 })).to
        .throws('"name" must be a string');
    });
  });
});