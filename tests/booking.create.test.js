import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { createBooking } from '../components/users/controller';
import Booking from '../components/booking/model';
import Trip from '../components/trip/model';
import seatAvailityCheck from '../components/booking/validation';
import { 
  tripIdValidation, 
  checkTripActiveStat 
} from '../components/trip/validator';
import {
  res,
  next,
  tripGetTripDBResponse,
  checkTripActiveStatReq,
  tripIdValidationReq,
  checkSeatAvailabilityReq,
  createBookingReq 
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for successful booking creation: POST /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'update').returns([]);
    sinon.stub(Booking, 'create').returns([{ id: 1 }]);
    await createBooking(createBookingReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 200 status', async () => {
    expect(res.status).to.have.been.calledWith(200);
  });

  it('it should return booking details', async () => {
    expect(apiResponse.data).to.not.be.null;
  });

  it('it should return booking id', async () => {
    expect(apiResponse.data).to.have.property('booking_id');
  });
  
  it('it should return user id', async () => {
    expect(apiResponse.data).to.have.property('user_id');
  });

  it('it should return trip id', async () => {
    expect(apiResponse.data)
      .to.have
      .property('trip_id');
  });
  
  it('it should return bus id', async () => {
    expect(apiResponse.data).to.have.property('bus_id');
  });
  
  it('it should return trip date', async () => {
    expect(apiResponse.data).to.have.property('trip_date');
  });
  
  it('it should return user\'s seat number', async () => {
    expect(apiResponse.data).to.have.property('seat_number');
  });
  it('it should return user\'s first name', async () => {
    expect(apiResponse.data).to.have.property('first_name');
  });
  it('it should return user\'s last name', async () => {
    expect(apiResponse.data).to.have.property('last_name');
  });
  it('it should return user\'s email', async () => {
    expect(apiResponse.data).to.have.property('email');
  });
  it('it should return user\'s phone number', async () => {
    expect(apiResponse.data).to.have.property('phone_number');
  });
});

describe('tests for invalid trip id during trip booking: POST /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    await tripIdValidation(tripIdValidationReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 400 status', async () => {
    expect(res.status).to.have.been.calledWith(400);
    expect(res.status).to.not.be.null;
  });

  it('it should return error message', async () => {
    expect(apiResponse.error).to.not.be.null;
  });
});

describe('tests for booking a trip that is cancelled: POST /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    await checkTripActiveStat(checkTripActiveStatReq, res, next);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 400 status', async () => {
    expect(res.status).to.have.been.calledWith(400);
    expect(res.status).to.not.be.null;
  });

  it('it should return error message', async () => {
    expect(apiResponse.error).to.not.be.null;
  });
});

describe('tests for booking a trip with an already occupied seat: POST /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Trip, 'getTrip').returns(tripGetTripDBResponse);
    await seatAvailityCheck(checkSeatAvailabilityReq, res, next);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  after(() => {
    sinon.restore();
  });
  
  it('it should return 400 status', async () => {
    expect(res.status).to.have.been.calledWith(400);
    expect(res.status).to.not.be.null;
  });

  it('it should return error message', async () => {
    expect(apiResponse.error).to.not.be.null;
  });
});
