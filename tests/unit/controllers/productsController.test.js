const { expect, use } = require('chai');
const { ValidationError } = require('joi');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
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
});
