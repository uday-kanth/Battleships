const { expect } = require('chai');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const DBConnection = require('../db/db');

describe('DBConnection', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('connect()', () => {
    it('should connect to MongoDB', async () => {
      const mockDb = sinon.stub();
      sandbox.stub(MongoClient, 'connect').resolves(mockDb);

      await DBConnection.connect();

      expect(MongoClient.connect.calledOnce).to.be.true;
      expect(DBConnection.db).to.equal(mockDb);
    });

    it('should throw an error if connection fails', async () => {
      const error = new Error('Connection failed');
      sandbox.stub(MongoClient, 'connect').rejects(error);

      try {
        await DBConnection.connect();
      } catch (err) {
        expect(err).to.equal(error);
        return;
      }

      throw new Error('Expected error to be thrown');
    });
  });

  describe('get()', () => {
    it('should return existing connection if available', async () => {
      const mockDb = sinon.stub();
      DBConnection.db = mockDb;

      const db = await DBConnection.get();

      expect(db).to.equal(mockDb);
    });

    
   
  });
});
