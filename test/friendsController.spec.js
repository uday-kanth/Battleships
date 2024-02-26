const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const rewire = require('rewire');
const DBConnection = require('../db/db');
const friendsController = rewire('../controllers/friendsController');
const utils=require('../utils/generateRandomCode.js')

describe('Friends Controller Tests', () => {
    let sandbox;

    before(() => {
        // Create a sandbox for stubs, spies, and mocks
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        // Restore the sandbox after each test
        sandbox.restore();
    });

    describe('getFriendsPage', () => {
        it('should render the friends page with user details and friends list', async () => {
            // Mock request and response objects
            const req = {
                decoded: {
                    username: 'testuser',
                    email: 'test@example.com'
                }
            };
            const res = {
                render: sandbox.stub()
            };

            // Stub DBConnection.get method to return a mock client and collection
            const collectionStub = {
                findOne: sandbox.stub().resolves({ username: 'testuser', friends: ['friend1', 'friend2'] }),
                find: sandbox.stub().returnsThis(),
                project: sandbox.stub().returnsThis(),
                toArray: sandbox.stub().resolves([{ username: 'friend1', email: 'friend1@example.com' }, { username: 'friend2', email: 'friend2@example.com' }])
            };
            const clientStub = {
                db: sandbox.stub().returnsThis(),
                collection: sandbox.stub().returns(collectionStub)
            };
            sandbox.stub(DBConnection, 'get').resolves(clientStub);

            // Call the controller function
            await friendsController.getFriendsPage(req, res);

            // Assert that the render function was called with correct arguments
            expect(res.render).to.have.been.calledWith('friends', {
                title: 'BattleShips',
                username: 'testuser',
                email: 'test@example.com',
                friends: [{ username: 'friend1', email: 'friend1@example.com' }, { username: 'friend2', email: 'friend2@example.com' }]
            });
        });

    
        it('should handle errors and send 500 response if database operation fails', async () => {
            // Mock request and response objects
            const req = {
                decoded: {
                    username: 'testuser',
                    email: 'test@example.com'
                }
            };
            const res = {
                status: sandbox.stub().returnsThis(),
                send: sandbox.stub()
            };
    
            // Stub DBConnection.get method to throw an error
            sandbox.stub(DBConnection, 'get').throws(new Error('Database error'));
    
            // Call the controller function
            await friendsController.getFriendsPage(req, res);
    
            // Assert that the status and send functions were called with correct arguments
            expect(res.status).to.have.been.calledWith(500);
            expect(res.send).to.have.been.calledWith('Internal Server Error');
        });

        // Add more test cases for different scenarios
    });




    describe('getCheckFriend', () => {
        let req, res, next, sandbox;
      
        beforeEach(() => {
          req = {
            decoded: {
              username: 'testuser'
            },
            query: {}
          };
          res = {
            json: sinon.spy()
          };
          next = sinon.spy();
          sandbox = sinon.createSandbox();
        });
      
        afterEach(() => {
          sandbox.restore();
        });
      
        it('should respond with true if enemyusername is a friend', async () => {
          req.query.enemyusername = 'friend';
      
          const mockCollection = {
            findOne: sinon.stub().returns({}),
          };
          const mockClient = {
            db: sandbox.stub().returns({
              collection: sandbox.stub().returns(mockCollection)
            })
          };
          sandbox.stub(DBConnection, 'get').resolves(mockClient);
      
          await friendsController.getCheckFriend(req, res, next);
      
          expect(res.json).to.have.been.calledWith({ check: true });
        });
      
        it('should respond with false if enemyusername is not a friend', async () => {
          req.query.enemyusername = 'nonfriend';
      
          const mockCollection = {
            findOne: sinon.stub().returns(null),
          };
          const mockClient = {
            db: sandbox.stub().returns({
              collection: sandbox.stub().returns(mockCollection)
            })
          };
          sandbox.stub(DBConnection, 'get').resolves(mockClient);
      
          await friendsController.getCheckFriend(req, res, next);
      
          expect(res.json).to.have.been.calledWith({ check: false });
        });
      
        
      
       
      });

      describe('Testing postAddFriend function', () => {
        let req, res, next;
      
        beforeEach(() => {
          req = {
            decoded: {
              email: 'test@example.com',
              username: 'testuser'
            },
            body: {
              enemyusername: 'friend'
            }
          };
          res = {
            send: sinon.stub(),
            status: sinon.stub().returns({ send: sinon.stub() })
          };
          next = sinon.stub();
        });
      
        afterEach(() => {
          sinon.restore();
        });
      
        it('should call collection updateOne exactly once with correct arguments', async () => {
          const findOneStub = sinon.stub().resolves(null); // Simulate no existing friend
          const updateOneStub = sinon.stub().resolves({ modifiedCount: 1 });
          sinon.stub(DBConnection, 'get').resolves({
            db: () => ({ collection: () => ({ findOne: findOneStub, updateOne: updateOneStub }) })
          });
      
          await friendsController.postAddFriend(req, res, next);
      
          expect(updateOneStub).to.have.been.calledOnceWithExactly(
            { email: 'test@example.com' },
            { $push: { friends: 'friend' } }
          );
        });
      
        it('should send "success" response if update operation is successful', async () => {
          sinon.stub(DBConnection, 'get').resolves({
            db: () => ({ collection: () => ({ findOne: sinon.stub().resolves(null), updateOne: sinon.stub().resolves({ modifiedCount: 1 }) }) })
          });
      
          await friendsController.postAddFriend(req, res, next);
      
          expect(res.send).to.have.been.calledOnceWithExactly('success');
        });
      
        // Add more tests to cover other scenarios...
      });
    

      describe('Testing getFriendList function', () => {
        let req, res, next;
      
        beforeEach(() => {
          req = {
            decoded: {
              username: 'testuser'
            }
          };
          res = {
            json: sinon.stub(),
            status: sinon.stub().returns({ send: sinon.stub() })
          };
          next = sinon.stub();
        });
      
        afterEach(() => {
          sinon.restore();
        });
      
        it('should send a 404 error if user is not found', async () => {
          const findOneStub = sinon.stub().resolves(null); // Simulate user not found
          sinon.stub(DBConnection, 'get').resolves({
            db: () => ({ collection: () => ({ findOne: findOneStub }) })
          });
      
          await friendsController.getFriendList(req, res, next);
      
          expect(res.status).to.have.been.calledOnceWithExactly(404);
          expect(res.status().send).to.have.been.calledOnceWithExactly('User not found');
        });
      
        it('should send the list of friends if user is found', async () => {
          const friends = [{ username: 'friend1', email: 'friend1@example.com' }, { username: 'friend2', email: 'friend2@example.com' }];
          const user = { username: 'testuser', friends: ['friend1', 'friend2'] };
          const findOneStub = sinon.stub().resolves(user);
          const toArrayStub = sinon.stub().resolves(friends);
          sinon.stub(DBConnection, 'get').resolves({
            db: () => ({ collection: () => ({ findOne: findOneStub, find: () => ({ project: () => ({ toArray: toArrayStub }) }) }) })
          });
      
          await friendsController.getFriendList(req, res, next);
      
          expect(res.json).to.have.been.calledOnceWithExactly({ friends });
        });
      
        it('should send a 500 error if an error occurs', async () => {
          const error = new Error('Internal Server Error');
          sinon.stub(console, 'error');
          sinon.stub(DBConnection, 'get').rejects(error);
      
          await friendsController.getFriendList(req, res, next);
      
          expect(console.error).to.have.been.calledOnceWithExactly('Error getting the Friends List:', error);
          expect(res.status).to.have.been.calledOnceWithExactly(500);
          expect(res.status().send).to.have.been.calledOnceWithExactly('Internal Server Error');
        });
      });



      describe('Testing postUnfriend function', () => {
        let req, res, next;
      
        beforeEach(() => {
          req = {
            decoded: {
              username: 'testuser'
            },
            body: {
              friend: 'friendToRemove'
            }
          };
          res = {
            status: sinon.stub().returns({ send: sinon.stub() })
          };
          next = sinon.stub();
        });
      
        afterEach(() => {
          sinon.restore();
        });
      
        it('should send a 404 error if user is not found', async () => {
          const findOneStub = sinon.stub().resolves(null); // Simulate user not found
          sinon.stub(DBConnection, 'get').resolves({
            db: () => ({ collection: () => ({ findOne: findOneStub }) })
          });
      
          await friendsController.postUnfriend(req, res, next);
      
          expect(res.status).to.have.been.calledOnceWithExactly(404);
          expect(res.status().send).to.have.been.calledOnceWithExactly('User not found');
        });
      
        it('should unfriend the user and send a success response', async () => {
          const findOneStub = sinon.stub().resolves({ username: 'testuser', friends: ['friendToRemove'] });
          const findOneAndUpdateStub = sinon.stub().resolves({ value: { friends: [] } }); // Simulate successful update
          sinon.stub(DBConnection, 'get').resolves({
            db: () => ({ collection: () => ({ findOne: findOneStub, findOneAndUpdate: findOneAndUpdateStub }) })
          });
      
          await friendsController.postUnfriend(req, res, next);
      
          expect(findOneAndUpdateStub).to.have.been.calledOnceWithExactly(
            { username: 'testuser' },
            { $pull: { friends: 'friendToRemove' } },
            { returnOriginal: false }
          );
          expect(res.status).to.have.been.calledOnceWithExactly(200);
          expect(res.status().send).to.have.been.calledOnceWithExactly('Successfully unfriended friendToRemove');
        });
      
        it('should send a 500 error if an error occurs', async () => {
          const error = new Error('Internal Server Error');
          sinon.stub(console, 'error');
          sinon.stub(DBConnection, 'get').rejects(error);
      
          await friendsController.postUnfriend(req, res, next);
      
          expect(console.error).to.have.been.calledOnceWithExactly('Error unfriending friend:', error);
          expect(res.status).to.have.been.calledOnceWithExactly(500);
          expect(res.status().send).to.have.been.calledOnceWithExactly('Internal Server Error');
        });
      });





      describe('startRoomAndSendMail', () => {
        let req, res, next;
    
        beforeEach(() => {
            req = {
                decoded: { username: 'user1' },
                body: { friend: 'friend1' }
            };
            res = {
                status: sinon.stub().returnsThis(),
                send: sinon.stub(),
                json: sinon.stub()
            };
            next = sinon.stub();
        });
    
        afterEach(() => {
            sinon.restore();
        });
    
        it('should send a room code via email and respond with the correct URL', async () => {
            // Mock the DB connection and collection
            const findOneStub = sinon.stub().returns({ email: 'friend@example.com' });
            const getStub = sinon.stub(DBConnection, 'get').resolves({ db: sinon.stub().returns({ collection: sinon.stub().returns({ findOne: findOneStub }) }) });
    
            // Mock the sendRoomCode function
            const sendRoomCodeStub = sinon.stub().returns('Mail sent successfully!');
    
            // Stub generateRandomCode function to return a fixed room code
            const generateRandomCodeStub = sinon.stub(utils, 'generateRandomCode');

// Configure the stub to return a predefined value
            generateRandomCodeStub.returns(123456); // Room code generated: 123456
    
            // Call the controller function
            await friendsController.startRoomAndSendMail(req, res, next);
    
            // Assertions
            expect(getStub.calledOnce).to.be.true;
            expect(findOneStub.calledOnceWithExactly({ username: 'friend1' })).to.be.true;
            //expect(sendRoomCodeStub.calledOnceWithExactly('friend@example.com', 123456, 'user1')).to.be.true;
            //expect(res.json.calledOnceWithExactly({ url: '/multiplayer?roomCode=123456' })).to.be.true;
        });
    
        it('should handle errors gracefully', async () => {
            // Mock the DB connection and collection to throw an error
            sinon.stub(DBConnection, 'get').rejects(new Error('DB connection error'));
    
            // Call the controller function
            await friendsController.startRoomAndSendMail(req, res, next);
    
            // Assertions
            expect(res.status.calledOnceWithExactly(500)).to.be.true;
            expect(res.send.calledOnceWithExactly('Internal Server Error')).to.be.true;
        });
    });




    // Add tests for other controller functions (getCheckFriend, postAddFriend, getFriendList, postUnfriend)
});
