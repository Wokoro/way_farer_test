import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { viewBooking } from '../components/users/controller';
import Booking from '../components/booking/model';
import { 
} from '../components/trip/validator';
import {
  res,
  viewUserBookingReq,
  viewBookingReq 
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for admin booking view: GET /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Booking, 'getAllBookings').returns([{}]);
    await viewBooking(viewBookingReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return all booking details', async () => {
    expect(apiResponse.data).to.not.be.null;
    expect(apiResponse.data).to.be.an('array');
  });
});

describe('tests for none admin booking view: GET /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Booking, 'getBooking').returns([{}]);
    await viewBooking(viewUserBookingReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return all booking for a user', async () => {
    expect(apiResponse.data).to.not.be.null;
    expect(apiResponse.data).to.be.an('array');
  });
});

describe('tests for no empty booking: GET /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Booking, 'getBooking').returns([]);
    await viewBooking(viewUserBookingReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return no booking available message', async () => {
    expect(apiResponse).to.have.property('error');
  });
});
