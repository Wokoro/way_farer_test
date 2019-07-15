import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { deleteBooking } from '../components/users/controller';
import Booking from '../components/booking/model';

import {
  res,
  deleteBookingReq 
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for successful booking deletion: DELETE /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Booking, 'deleteBooking').returns({ rows: [1] });
    await deleteBooking(deleteBookingReq, res);
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
  
  it('it should return success message', async () => {
    expect(apiResponse.data).to.have.property('message');
  });
});

describe('tests for unsuccessful booking deletion: DELETE /bookings', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(Booking, 'deleteBooking').returns({ rows: [] });
    await deleteBooking(deleteBookingReq, res);
    [apiResponse] = res.json.getCall(0).args;
  });

  after(() => {
    sinon.restore();
  });
  
  it('it should return 400 status', async () => {
    expect(apiResponse).to.have.property('status');
  });
  
  it('it should return error message', async () => {
    expect(apiResponse).to.have.property('error');
  });
});
