const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const sandbox = sinon.createSandbox();
const indexController=require('../controllers/indexController');
const utils=require('../utils/mailerUtil.js')

let app = rewire('../app');




describe('Testing express Index routes', () => {

  afterEach(() => {
    // app = rewire('../app');
    sandbox.restore();
  });
 
  describe('GET /', () => {

    beforeEach(() => {
      sandbox.stub(indexController, 'getIndexPage').returns('OK');
    });

    it('/ should succeed', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, response) => {
          done(err);
        });
    });

    it('/ should succeed with JWT token and redirect to dashboard ', (done) => {
      const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
      request(app)
        .get('/')
        .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
        .expect(302)
        .end((err, response) => {
          done(err);
        });
    });

  });




  describe('GET /dashboard', () => {

    beforeEach(() => {
      sandbox.stub(indexController, 'getDashboardPage').returns('OK');
    });

    it('/dashboard should not succeed without token and return 401', (done) => {
      request(app)
        .get('/dashboard')
        .expect(401)
        .end((err, response) => {
          done(err);
        });
    });

    it('/dashboard should succeed with JWT token', (done) => {
      const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
      request(app)
        .get('/dashboard')
        .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
        .expect(200)
        .end((err, response) => {
          done(err);
        });
    });

  });





  describe('GET /multiplayer/room', () => {

    beforeEach(() => {
      sandbox.stub(indexController, 'getMultiplayerRoomPage').returns('OK');
    });

    it('/multiplayer/room should not succeed without token and return 401', (done) => {
      request(app)
        .get('/multiplayer/room')
        .expect(401)
        .end((err, response) => {
          done(err);
        });
    });

    it('/dashboard should succeed with JWT token', (done) => {
      const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
      request(app)
        .get('/multiplayer/room')
        .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
        .expect(200)
        .end((err, response) => {
          done(err);
        });
    });

  });



  describe('GET /multiplayer', () => {

    beforeEach(() => {
      sandbox.stub(indexController, 'getMultiplayerPage').returns('OK');
    });

    it('/multiplayer should not succeed without token and return 401', (done) => {
      request(app)
        .get('/multiplayer')
        .expect(401)
        .end((err, response) => {
          done(err);
        });
    });

    it('/multiplayer should succeed with JWT token', (done) => {
      const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
      request(app)
        .get('/multiplayer')
        .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
        .expect(200)
        .end((err, response) => {
          done(err);
        });
    });

  });








  describe('GET /shareroom', () => {

    beforeEach(() => {
      sandbox.stub(indexController, 'postShareRoom').returns('OK');
      sandbox.stub(utils,"sendRoomCode").returns("ok")
    });

    it('/shareroom should not succeed without token and return 401', (done) => {
      request(app)
        .post('/shareroom')
        .expect(401)
        .end((err, response) => {
          done(err);
        });
    });

    // it('/shareroom  should succeed with JWT token', (done) => {
    //   const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
    //   request(app)
    //     .post('/shareroom ')
    //     .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
    //     .expect(200)
    //     .end((err, response) => {
    //       done(err);
    //     });
    // });

  });

 



  describe('GET /winner', () => {

    beforeEach(() => {
      sandbox.stub(indexController, 'getWinner').returns('OK');
    });

    it('/winner should not succeed without token and return 401', (done) => {
      request(app)
        .get('/winner')
        .query({ winner: 'test', reason: 'testing' })
        .expect(401)
        .end((err, response) => {
          done(err);
        });
    });

    it('/winner  should succeed with JWT token', (done) => {
      const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
      request(app)
        .get('/winner')
        .query({ winner: 'test', reason: 'testing' })
        .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
        .expect(200)
        .end((err, response) => {
          done(err);
        });
    });

  });





  describe('GET /singleplayer', () => {

    beforeEach(() => {
      sandbox.stub(indexController, 'postShareRoom').returns('OK');
    });

    it('/singleplayer should not succeed without token and return 401', (done) => {
      request(app)
        .get('/singleplayer')
        .expect(401)
        .end((err, response) => {
          done(err);
        });
    });

    it('/singleplayer  should succeed with JWT token', (done) => {
      const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
      request(app)
        .get('/singleplayer')
        .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
        .expect(200)
        .end((err, response) => {
          done(err);
        });
    });

  });

















});
