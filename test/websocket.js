
import { expect } from 'chai';



const ioClient = require('socket.io-client');
const http = require('http');
const server = require('../app'); // Assuming your app is exported from app.js
const socketURL = 'http://localhost:3000'; // Adjust the URL according to your server setup

describe('WebSocket Handling', function() {
  let client1, client2;

  // before(function(done) {
  //   // Start the server before running the tests
  //   server.listen(3000, () => {
  //     console.log('Server is running on port 3000');
  //     done();
  //   });
  // });

  after(function(done) {
    // Close the server after running the tests
    server.close(() => {
      console.log('Server closed');
      done();
    });
  });

  beforeEach(function(done) {
    // Connect two clients before each test
    client1 = ioClient.connect(socketURL);
    client2 = ioClient.connect(socketURL);
    console.log("connected")
    done();
  });

  afterEach(function(done) {
    // Disconnect clients after each test
    client1.disconnect();
    client2.disconnect();
    console.log("disconnected")
    done();
  });

  it('should assign player number on connection', function(done) {
    client1.on('connect', () => {
      client1.on('player-number', (playerIndex) => {
        expect(playerIndex).to.be.a('number');
        console.log(playerIndex)
        done();
      });
    });
  });

  // Add more test cases for other WebSocket functionality
});
