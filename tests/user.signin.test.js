import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { checkUserExistence } from '../components/users/validator';
import { signin } from '../components/users/controller';
import { req, res } from './test.data';
import User from '../components/users/model';

chai.should();
chai.use(sinonChai);

const { expect } = chai;

let apiResponse = {};

describe('tests for successful signin: POST /auth/signin', () => {
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
    await signin(req, res);
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
  
  it('it should return user admin status', async () => {
    expect(apiResponse.data).to.have.property('is_admin');
  });

  it('it should return user token', async () => {
    expect(apiResponse.data).to.have.property('token');
  });
});

describe('tests for unsuccessful signin: POST /auth/signin', () => {
  before(async () => {
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(res, 'json').returnsThis();
  });
  after(() => {
    sinon.restore();
  });
  describe('tests for wrong email', () => {
    before(async () => {
      sinon.stub(User, 'getUser').returns([]);
      await checkUserExistence(req, res);
      [apiResponse] = res.json.getCall(0).args;
    });
    after(async () => {
      User.getUser.restore();
    });
    it('it should return 400 status', async () => {
      expect(res.status).to.have.been.calledWith(400);
    });
    it('it should return error message', async () => {
      expect(apiResponse).to.have.property('errors');
    });
  });
  describe('tests for wrong pasword', () => {
    before(async () => {
      sinon.stub(User, 'getUser').returns([{ password: 'sss' }]);
      await checkUserExistence(req, res);
      [apiResponse] = res.json.getCall(0).args;
    });
    after(async () => {
      User.getUser.restore();
    });
    it('it should return 400 status', async () => {
      expect(res.status).to.have.been.calledWith(400);
    });
    it('it should return error message', async () => {
      expect(apiResponse).to.have.property('errors');
    });
  });
});
