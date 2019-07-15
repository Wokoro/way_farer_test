import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { updateTrip } from '../components/admin/controller';
import Trip from '../components/trip/model';
import { tripIdValidation } from '../components/trip/validator';

import {
  res, next, tripCancelReq, tripActivateReq
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for trip cancellaton: PATCH /trips/:tripId', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'updateTrip').returns([{}]);
    await updateTrip(tripCancelReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return trip details', async () => {
    expect(apiResponse.data).to.not.be.null;
  });

  it('it should return message of activation', async () => {
    expect(apiResponse.data).to.have.property('message');
  });
  
  it('it should return updated trip information', async () => {
    expect(apiResponse.data).to.have.property('trip_data');
  });
});

describe('tests for successful trip activation: PATCH /trips/:tripId', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'updateTrip').returns([{}]);
    await updateTrip(tripActivateReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return trip details', async () => {
    expect(apiResponse.data).to.not.be.null;
  });

  it('it should return message of activation', async () => {
    expect(apiResponse.data).to.have.property('message');
  });
  
  it('it should return updated trip information', async () => {
    expect(apiResponse.data).to.have.property('trip_data');
  });
});

describe('tests for unsuccessful trip update: PATCH /trips/:tripId', () => {
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
  });
  after(() => {
    sinon.restore();
  });
  describe('test for unexisting tripId', () => {
    before(async () => {
      sinon.stub(Trip, 'getTrip').returns([]);
      await tripIdValidation(tripActivateReq, res, next);
      [apiResponse] = res.json.getCall(0).args;
    });
    after(() => {
      sinon.restore();
    });
    it('it should return 400 status', () => {
      expect(res.status).to.have.been.calledWith(400);
    });
    it('it should return error', () => {
      expect(apiResponse).to.have.property('errors');
    });
  });
});
