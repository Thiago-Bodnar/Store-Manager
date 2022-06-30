const { expect, use } = require('chai');
const sinon = require('sinon');
const NotFoundError = require('../../../errors/NotFoundError');
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
});