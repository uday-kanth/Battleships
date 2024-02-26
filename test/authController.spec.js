const chai = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DBconnection = require('../db/db');
const authController = require('../controllers/authController');
const { welcomeMail } = require('../utils/mailerUtil');

const expect = chai.expect;

describe('AuthController', () => {
  let req, res, next, client, collection;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
    next = sinon.spy();
    client = {
      db: sinon.stub().returnsThis(),
      collection: sinon.stub().returnsThis(),
      insertOne: sinon.stub().resolves(),
      findOne: sinon.stub().resolves(null)
    };
    sinon.stub(DBconnection, 'get').resolves(client);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      req.body = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };
      await authController.registerUser(req, res, next);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'User signed up successfully' })).to.be.true;
      expect(DBconnection.get.calledOnce).to.be.true;
    });


    it('should return error if email already exists', async () => {
      req.body = { username: 'testuser', email: 'existing@example.com', password: 'testpassword' };
      client.findOne.resolves({}); // Simulating existing user
      await authController.registerUser(req, res, next);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: 'Email OR Username already exists' })).to.be.true;
    });


    it('should return error if email is invalid', async () => {
      req.body = { username: 'testuser', email: 'invalidemail', password: 'testpassword' };
      await authController.registerUser(req, res, next);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: 'Please provide all required fields' })).to.be.true;
    });

    it('should return 500 error if an internal server error occurs', async () => {
      req.body = { username: 'testuser', email: 'test@example.com', password: 'testpassword' };
      sinon.stub(console, 'error');
      client.insertOne.rejects(new Error('Database error'));
      await authController.registerUser(req, res, next);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: 'Internal server error' })).to.be.true;
    });

   
  });



  describe('logoutUser', () => {
    let req, res;
  
    beforeEach(() => {
      req = {};
      res = {
        clearCookie: sinon.spy(),
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };
    });
  
    
      it('should clear JWT token from client-side and return successful logout message', () => {
        authController.logoutUser(req, res);
        expect(res.clearCookie.calledWith('jwtToken')).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ message: 'Logout successful' })).to.be.true;
      });
    
  });






  describe('loginUser', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      res = {
        status: sinon.stub().returnsThis(),
        cookie: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
    });
  
    
      it('should return 401 if user does not exist', async () => {
        // sinon.stub(DBconnection, 'get').resolves({
        //   db: () => ({
        //     collection: () => ({
        //       findOne: sinon.stub().resolves(null)
        //     })
        //   })
        // });
  
        await authController.loginUser(req, res);
  
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ error: 'Invalid credentials' })).to.be.true;
      });
  
      it('should return 401 if password does not match', async () => {
        // sinon.stub(DBconnection, 'get').resolves({
        //   db: () => ({
        //     collection: () => ({
        //       findOne: sinon.stub().resolves({ password:bcrypt.hash('differentPassword', 10) })
        //     })
        //   })
        // });
  
        await authController.loginUser(req, res);
  
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.json.calledWith({ error: 'Invalid credentials' })).to.be.true;
      });
  
      it('should set JWT token in cookies and return 200 if login successful', async () => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        client.findOne.resolves({ password: hashedPassword, username: 'testuser' });
  
        sinon.stub(jwt, 'sign').returns('mockToken');
  
        await authController.loginUser(req, res);
  
        expect(res.cookie.calledWith('jwtToken', 'mockToken', { withCredentials: true, httpOnly: true })).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.send.calledOnce).to.be.true;
      });
  
    
    
  });






















});
