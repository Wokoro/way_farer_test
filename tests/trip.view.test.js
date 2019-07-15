import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { getTrips } from '../components/users/controller';
import Trip from '../components/trip/model';

import {
  res,
  getAllTripReq,
  getDestinationTripReq,
  getOriginTripReq,
  allTripsResponse
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for successful viewing of all trips: GET /trips/', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'getAllTrips').returns(allTripsResponse);
    await getTrips(getAllTripReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return all trips', async () => {
    expect(apiResponse.data).to.not.be.null;
    expect(apiResponse.data).to.an('array');
  });
});

describe('tests for unsuccessful viewing of all trips: GET /trips', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'getAllTrips').returns([]);
    await getTrips(getAllTripReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return trip unavailable message', async () => {
    expect(apiResponse.message).to.not.be.null;
    expect(apiResponse.message).to.be.equals('No trip available');
  });
});

describe('test for viewing filtered trips', () => {
  describe('tests for viewing trips: GET /trips/?destination={value}',
    () => {  
      before(async () => {
        sinon.stub(res, 'status').returnsThis();
        sinon.stub(res, 'json').returnsThis();
        sinon.stub(Trip, 'getTrip').returns([{}]);
        await getTrips(getDestinationTripReq, res);
        [apiResponse] = res.json.getCall(0).args;
      });
    
      after(() => {
        sinon.restore();
      });
    
      it('it should return 200 status', async () => {
        expect(res.status).to.have.been.calledWith(200);
      });
  
      it('it should return all destination trips', async () => {
        expect(apiResponse.data).to.not.be.null;
        expect(apiResponse.data).to.be.an('array');
      });
    });
  describe('tests for trips viewing: GET /trips/?origin={value}', () => {  
    before(async () => {
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(res, 'json').returnsThis();
      sinon.stub(Trip, 'getTrip').returns([{}]);
      await getTrips(getOriginTripReq, res);
      [apiResponse] = res.json.getCall(0).args;
    });
    
    after(() => {
      sinon.restore();
    });
    
    it('it should return 200 status', async () => {
      expect(res.status).to.have.been.calledWith(200);
    });
  
    it('it should return all destination trips', async () => {
      expect(apiResponse.data).to.not.be.null;
      expect(apiResponse.data).to.be.an('array');
    });
  });
});
