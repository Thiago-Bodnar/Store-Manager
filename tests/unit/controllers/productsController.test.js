const { expect, use } = require('chai');
const { ValidationError } = require('joi');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
const UnprocessableError = require('../../../errors/UnprocessableError');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
require('express-async-errors');

use(chaiAsPromised)

describe('productsController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('get', () => { 
    it('Se o id é válido, retorna o status 200 com o objeto', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 };

      sinon.stub(productsService, 'get').resolves({id: 1, name: 'Martelo de Thor'});

      await productsController.get(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ id: 1, name: 'Martelo de Thor' })).to.be.eq(true);
    });

    it('Se o id passado é inválido, retorna erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 'teste' };

      expect(productsController.get(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('Quando o id passado não é encontrado, retorna erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 11 };

      expect(productsController.get(req, res))
        .to.be.rejectedWith(NotFoundError);
    });
  });

  describe('list', () => {
    it('Retorna a lista com status 200', async () => {
      const req = {};
      const res = {};

      const list = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productsService, 'list').resolves([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' }, 
      ]);

      await productsController.list(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(list)).to.be.eq(true);
    });
  });

  describe('add', () => {
    it('Lança um erro ao passar name inválido ou inexistente', async () => {
      const req = {};
      const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    req.body = { name: '' };
      
      expect(productsController.add(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('Lança um erro quando name tem menos de 5 caracteres', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { name: 'Aoba' };
      
      expect(productsController.add(req, res))
        .to.be.rejectedWith(UnprocessableError);
    });

    it('Adiciona com sucesso', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
  
      req.body = { name: 'Capa da invisibilidade' };

      sinon.stub(productsService, 'get').resolves({id: 4, name: 'Capa da invisibilidade' });

      await productsController.add(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({id: 4, name: 'Capa da invisibilidade' })).to.be.true;
    });
  });

  describe('edit', () => {
    it('Se o id passado é inválido, retorna erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 'teste' };

      expect(productsController.edit(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('Quando o id passado não é encontrado, retorna erro', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 11 };

      expect(productsController.edit(req, res))
        .to.be.rejectedWith(NotFoundError);
    });

    it('Lança um erro ao passar name inválido ou inexistente', async () => {
      const req = {};
      const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    req.body = { name: '' };
      
      expect(productsController.edit(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('Lança um erro quando name tem menos de 5 caracteres', () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = { name: 'Aoba' };
      
      expect(productsController.edit(req, res))
        .to.be.rejectedWith(UnprocessableError);
    });

    it('Edita com sucesso', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 }
      req.body = { name: 'Capa da invisibilidade' };

      sinon.stub(productsService, 'get').resolves({id: 1, name: 'Capa da invisibilidade' });

      await productsController.edit(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({id: 1, name: 'Capa da invisibilidade' })).to.be.true;
    });
  });
});
