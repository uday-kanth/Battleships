const chai = require('chai');
const sinon = require('sinon');
const indexController = require('../controllers/indexController');
const utils=require('../utils/generateRandomCode')

const expect = chai.expect;

describe('IndexController', () => {
  describe('getIndexPage', () => {
    it('should render signuplogin page if no JWT token is present', async () => {
      const req = { cookies: {} };
      const res = { status: sinon.stub().returnsThis(), render: sinon.spy(), redirect: sinon.spy() };
      const next = sinon.spy();

      await indexController.getIndexPage(req, res, next);

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.render.calledOnceWith('signuplogin', { title: 'BattleShips' })).to.be.true;
      expect(res.redirect.called).to.be.false;
    });

    it('should redirect to /dashboard if JWT token is present', async () => {
      const req = { cookies: { jwtToken: 'mockToken' } };
      const res = { status: sinon.stub().returnsThis(), render: sinon.spy(), redirect: sinon.spy() };
      const next = sinon.spy();

      await indexController.getIndexPage(req, res, next);

      expect(res.status.calledOnceWith(200)).to.be.true;
      expect(res.redirect.calledOnceWith('/dashboard')).to.be.true;
      expect(res.render.called).to.be.false;
    });
  });

  describe('getSinglePlayerPage', () => {
    it('should render the singleplayer page', async () => {
      const req = {};
      const res = { render: sinon.spy() };
      const next = sinon.spy();

      await indexController.getSinglePlayerPage(req, res, next);

      expect(res.render.calledOnceWith('singleplayer', { title: 'BattleShips' })).to.be.true;
      expect(next.called).to.be.false;
    });
  });

  describe('getMultiplayerRoomPage', () => {
    it('should render the multiplayer room page with username and email', () => {
      const req = { decoded: { username: 'testuser', email: 'test@example.com' } };
      const res = { render: sinon.spy() };
      const next = sinon.spy();

      indexController.getMultiplayerRoomPage(req, res, next);

      // Assertions
      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledOnceWith('room', { title: 'BattleShips', username: 'testuser', email: 'test@example.com' })).to.be.true;
    });
  });


  describe('getMultiplayerPage', () => {
    let req, res, next, generateRandomCodeStub;

    beforeEach(() => {
      req = { query: {}, decoded: { username: 'testuser', email: 'test@example.com' } };
      res = { render: sinon.spy() };
      next = sinon.spy();
      
    });

    afterEach(() => {
      
    });

    it('should render the multiplayer page with provided room code if query parameter is provided', () => {
      req.query.roomCode = 'providedRoomCode';

      indexController.getMultiplayerPage(req, res, next);
      

      expect(res.render.calledOnce).to.be.true;
      expect(res.render.calledWith('multiplayer', { title: 'BattleShips', roomCode: 'providedRoomCode', username: 'testuser', email: 'test@example.com' })).to.be.true;
    });
  });




  describe('getDashboardPage', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            decoded: { username: 'testuser', email: 'test@example.com' }
        };
        res = {
            render: sinon.spy(),
        };
        next = sinon.spy();
    });

    it('should render the dashboard page with correct username and email', () => {
        
        indexController.getDashboardPage(req, res, next);

        // Assertions
        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('index', { title: 'BattleShips', username: 'testuser', email: 'test@example.com' })).to.be.true;
    });

});















});
