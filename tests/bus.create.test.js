import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { createBus } from '../components/admin/controller';
import Bus from '../components/bus/model';
import { checkUniqueness } from '../components/bus/validator';
import {
  busReq, res, next, busCreateDBResponse 
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for successful bus creation: POST /bus', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Bus, 'create').returns(busCreateDBResponse);
    await createBus(busReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return user details', async () => {
    expect(apiResponse.data).to.not.be.null;
  });

  it('it should return bus id', async () => {
    expect(apiResponse.data).to.have.property('id');
  });
  
  it('it should return bus number plate', async () => {
    expect(apiResponse.data).to.have.property('number_plate');
  });

  it('it should return bus manufacturer', async () => {
    expect(apiResponse.data)
      .to.have
      .property('manufacturer');
  });
  
  it('it should return bus model', async () => {
    expect(apiResponse.data).to.have.property('model');
  });
  
  it('it should return bus year', async () => {
    expect(apiResponse.data).to.have.property('year');
  });
});
describe('tests for unsuccessful bus creation: POST /bus', () => {
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
  });
  after(() => {
    sinon.restore();
  });

  describe('test for an already existing bus', () => {
    before(async () => {
      sinon.stub(Bus, 'getBus').returns([{}]);
      await checkUniqueness(busReq, res, next);
      [apiResponse] = res.json.getCall(0).args;
    });
    it('it should return 400 status', () => {
      expect(res.status).to.have.been.calledWith(400);
    });
    it('it should return error', () => {
      expect(apiResponse).to.have.property('errors');
    });
  });
});


// expect(res).to.have.status(201);
// expect(res.body).to.be.a('object');
// 
// expect(res.body.data['0']).to.not.include.key('password');
// expect(err).to.be.null;
