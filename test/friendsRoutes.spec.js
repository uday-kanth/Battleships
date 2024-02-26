// const chai = require('chai');
// const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);
// const rewire = require('rewire');
// const request = require('supertest');
// const jwt = require('jsonwebtoken');

// const sandbox = sinon.createSandbox();
// const friendsController=require('../controllers/friendsController.js');

// let app = rewire('../app');
 
 


// describe('Testing express Friends routes', () => {
    

//   afterEach(() => {
//     // app = rewire('../app');
//     sandbox.restore();
//   });
 
//   describe('GET /friends', () => {

//     beforeEach(() => {
//       sandbox.stub(indexController, 'getIndexPage').returns('OK');
//     });

//     it('/friends should not succeed without JWT token', (done) => {
//       request(app)
//         .get('/friends')
//         .expect(401)
//         .end((err, response) => {
//           done(err);
//         });
//     });

//     it('/friends should succeed with JWT token and redirect to dashboard ', (done) => {
//       const token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
//       request(app)
//         .get('/friends')
//         .set('Cookie', `jwtToken=${token}`) // Set the JWT token in the request
//         .expect(200)
//         .end((err, response) => {
//           done(err);
//         });
//     });

//   });





// });
