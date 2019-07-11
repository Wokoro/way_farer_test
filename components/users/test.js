import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { signup } from './controller';
import { req, res, dbResponse } from './test.data';
import User from './model';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};

describe('Create user account tests: POST /auth/signup', () => {
  before(() => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    sinon.stub(User, 'createUser').returns(dbResponse);
  });

  after(() => {
    sinon.restore();
  });

  beforeEach(async () => {
    await signup(req, res);
    [apiResponse] = res.json.getCall(0).args;
  });
  
  describe('tests for successful signup', () => {
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
  describe('tests for unsuccessful signup', () => {
  });
});


// expect(res).to.have.status(201);
// expect(res.body).to.be.a('object');
// 
// expect(res.body.data['0']).to.not.include.key('password');
// expect(err).to.be.null;
