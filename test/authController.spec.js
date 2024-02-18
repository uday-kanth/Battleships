const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const rewire = require('rewire');

const authController = rewire('../controllers/authController');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication Controller - Register User', () => {
  let registerUser;
  let collectionMock;

  beforeEach(async () => {
    registerUser = await authController.__get__('registerUser');
    collectionMock = {
      findOne: sinon.stub().returns(null),
      insertOne: sinon.stub().returns(true)
    };
    authController.__set__('DBconnection', {
      get: sinon.stub().returns({ db: () => ({ collection: () => collectionMock }) })
    });
  });

  it('should return status 400 if email already exists', async () => {
    collectionMock.findOne.returns({ email: 'test@example.com' });
    const req = { body: { username: 'test', email: 'test@example.com', password: 'password' } };
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status.returns(res);

    await registerUser(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: 'Email already exists' })).to.be.true;
  });

  it('should return status 400 if email is invalid', async () => {
    const req = { body: { username: 'test', email: 'invalid-email', password: 'password' } };
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status.returns(res);

    await registerUser(req, res);
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ error: 'Please provide all required fields' })).to.be.true;
  });

  it('should return status 200 and message if user is registered successfully', async () => {
    const req = { body: { username: 'test', email: 'test@example.com', password: 'password' } };
    const res = { status: sinon.stub(), json: sinon.stub() };
    res.status.returns(res);

    await registerUser(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'User signed up successfully' })).to.be.true;
  });
});

describe('Authentication Controller - Login User', () => {
  let loginUser;
  let collectionMock;

  beforeEach(() => {
    loginUser = authController.__get__('loginUser');
    collectionMock = {
      findOne: sinon.stub().returns({ email: 'test@example.com', password: 'hashedPassword' })
    };
    authController.__set__('DBconnection', {
      get: sinon.stub().returns({ db: () => ({ collection: () => collectionMock }) })
    });
  });

  it('should return status 401 if user does not exist', async () => {
    collectionMock.findOne.returns(null);
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = { status: sinon.stub(), json: sinon.stub(), cookie: sinon.stub() };
    res.status.returns(res);

    await loginUser(req, res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ error: 'Invalid credentials' })).to.be.true;
  });

  it('should return status 401 if password is incorrect', async () => {
    const req = { body: { email: 'test@example.com', password: 'incorrectPassword' } };
    const res = { status: sinon.stub(), json: sinon.stub(), cookie: sinon.stub() };
    res.status.returns(res);

    await loginUser(req, res);
    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ error: 'Invalid credentials' })).to.be.true;
  });

  it('should return status 200 and set JWT token in cookies if login is successful', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } };
    const res = { status: sinon.stub(), json: sinon.stub(), cookie: sinon.stub() };
    res.status.returns(res);

    await loginUser(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.cookie.calledWith('jwtToken')).to.be.true;
  });
});
