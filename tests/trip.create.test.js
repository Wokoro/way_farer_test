import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { createTrip } from '../components/admin/controller';
import Trip from '../components/trip/model';
import Bus from '../components/bus/model';
import { checkBusAvailability } from '../components/bus/validator';

import {
  req, res, next, tripCreateDBResponse 
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for successful trip creation: POST /trip', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'create').returns(tripCreateDBResponse);
    await createTrip(req, res);
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

  it('it should return trip id', async () => {
    expect(apiResponse.data).to.have.property('id');
  });
  
  it('it should return bus id', async () => {
    expect(apiResponse.data).to.have.property('bus_id');
  });

  it('it should return trip origin', async () => {
    expect(apiResponse.data).to.have.property('origin');
  });
  
  it('it should return trip destination', async () => {
    expect(apiResponse.data).to.have.property('destination');
  });
  
  it('it should return trip fare', async () => {
    expect(apiResponse.data).to.have.property('fare');
  });
  
  it('it should return trip status', async () => {
    expect(apiResponse.data).to.have.property('status');
  });

  it('it should return trip duration', async () => {
    expect(apiResponse.data).to.have.property('status');
  });

  it('it should return available seats for trip', async () => {
    expect(apiResponse.data).to.have.property('available_seats');
  });
});

describe('tests for unsuccessful trip creation: POST /trip', () => {
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
  });
  after(() => {
    sinon.restore();
  });

  describe('test for unavailable bus', () => {
    before(async () => {
      sinon.stub(Bus, 'getBus').returns([]);
      sinon.stub(Bus, 'getBuses').returns([{}]);
      await checkBusAvailability(req, res, next);
      [apiResponse] = res.json.getCall(0).args;
    });
    after(() => {
      Bus.getBus.restore();
      Bus.getBuses.restore();
    });
    it('it should return 400 status', () => {
      expect(res.status).to.have.been.calledWith(400);
    });
    it('it should return error', () => {
      expect(apiResponse).to.have.property('error');
    });
  });
  describe('test for none existing bus', () => {
    before(async () => {
      sinon.stub(Bus, 'getBus').returns([false]);
      sinon.stub(Bus, 'getBuses').returns([{}]);
      await checkBusAvailability(req, res, next);
      [apiResponse] = res.json.getCall(0).args;
    });
    after(async () => {
      sinon.restore();
    });
    it('it should return 400 status', () => {
      expect(res.status).to.have.been.calledWith(400);
    });
    it('it should return error', () => {
      expect(apiResponse).to.have.property('error');
    });
  });
});
