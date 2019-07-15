import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { signup } from '../components/users/controller';
import User from '../components/users/model';
import { checkUniqueness } from '../components/users/validator';
import {
  req, res, next, signupDBResponse 
} from './test.data';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};


describe('tests for successful user signup: POST /auth/signup', () => {  
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(User, 'createUser').returns(signupDBResponse);
    await signup(req, res);
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

  it('it should return user id', async () => {
    expect(apiResponse.data).to.have.property('user_id');
  });
  
  it('it should return user firstname', async () => {
    expect(apiResponse.data).to.have.property('first_name');
  });

  it('it should return user lastname', async () => {
    expect(apiResponse.data)
      .to.have
      .property('last_name');
  });
  
  it('it should return user email', async () => {
    expect(apiResponse.data).to.have.property('email');
  });
  
  it('it should return user token', async () => {
    expect(apiResponse.data).to.have.property('token');
  });
  
  it('it should return admin status', async () => {
    expect(apiResponse.data).to.have.property('is_admin');
  });
});
describe('tests for unsuccessful user signup: POST /auth/signup', () => {
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
  });
  after(() => {
    sinon.restore();
  });

  describe('test for an already existing user', () => {
    before(async () => {
      sinon.stub(User, 'getUser').returns([{}]);
      await checkUniqueness(req, res, next);
      [apiResponse] = res.json.getCall(0).args;
    });
    it('it should return 400 status', () => {
      expect(res.status).to.have.been.calledWith(400);
    });
    it('it should return error', () => {
      expect(apiResponse).to.have.property('error');
    });
  });
});
