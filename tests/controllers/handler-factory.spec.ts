/* import mongoose from 'mongoose';
import sinon from 'sinon';
import chai from 'chai';
import { ImportMock, MockManager } from 'ts-mock-imports';
import { HandlerFactory } from '../../server/src/controllers/handler-factory';
import * as sendAPIResponseModule from '../../server/src/utils/api-response-factory';
import * as catchAsyncModule from '../../server/src/utils/catch-async';
import * as APIFeaturesModule from '../../server/src/utils/api-features';
import * as apiResponseFactoryModule from '../../server/src/utils/api-response-factory';

describe('Handler factory', () => {
  describe('get all', () => {
    it('should be wrapped into a catch async function', () => {
      const catchAsyncStub = ImportMock.mockFunction(
        catchAsyncModule,
        'catchAsync',
        'fakeCatchAsync'
      );
      const handlerFactory = new HandlerFactory();
      chai
        .expect(handlerFactory.getAll(mongoose.Model))
        .to.equal('fakeCatchAsync');
      catchAsyncStub.restore();
    });

    it('should call the find method', () => {
      // Model find stub
      const findStub = ImportMock.mockFunction(mongoose.Model, 'find');
      const docs = [
        {
          id: 1,
          name: 'Doc 1'
        },
        {
          id: 2,
          name: 'Doc 2'
        }
      ];
      findStub.resolves(docs);
      // API Features class mock
      const APIFeaturesMock = ImportMock.mockClass(
        APIFeaturesModule,
        'APIFeatures'
      );
      // API Features filter method stub
      const filterStub = APIFeaturesMock.mock(
        'filter',
        APIFeaturesMock.getMockInstance()
      );
      // API Features sort method stub
      const sortStub = APIFeaturesMock.mock(
        'sort',
        APIFeaturesMock.getMockInstance()
      );
      // API Features limite fields stub
      const limitFieldsStub = APIFeaturesMock.mock(
        'limitFields',
        APIFeaturesMock.getMockInstance()
      );
      // API Features paginate stub
      const paginateStub = APIFeaturesMock.mock(
        'paginate',
        APIFeaturesMock.getMockInstance()
      );

      APIFeaturesMock.set('query', mongoose.Model.find());
      // const queryStub = APIFeaturesMock.mock('query', docs);

      const sendResponseStub = ImportMock.mockFunction(
        apiResponseFactoryModule,
        'sendAPIResponse'
      );

      const handlerFactory = new HandlerFactory();
      const getAll = handlerFactory.getAll(mongoose.Model);
      getAll({} as any, {} as any, {} as any);
      // chai.expect(findStub.calledOnce).to.be.true;
      chai.expect(filterStub.calledOnce).to.be.true;
      chai.expect(sortStub.calledOnce).to.be.true;
      chai.expect(limitFieldsStub.calledOnce).to.be.true;
      chai.expect(paginateStub.calledOnce).to.be.true;
      const responseData = {
        status: 'success',
        results: docs.length,
        data: {
          data: docs
        }
      };
      // console.log('test', sendResponseStub.args);
      chai.expect(sendResponseStub.called).below(4);
    });
  });
});
 */
