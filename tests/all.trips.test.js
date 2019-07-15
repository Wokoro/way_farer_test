import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { getTrips } from '../components/users/controller';
import Trip from '../components/trip/model';

import {
  res, getAllTripReq
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for successful trips view: GET /trips', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'getAllTrips').returns([{}]);
    await getTrips(getAllTripReq, res);
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
    expect(apiResponse.data).to.be.an('array');
  });
});

describe('tests for unsuccessful trips view: GET /trips', () => {  
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

  it('it should return message of no trips', async () => {
    expect(apiResponse).to.have.property('message');
  });
});
