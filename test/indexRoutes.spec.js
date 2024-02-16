const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your app file is named 'app.js'
const expect = chai.expect;
const jwt = require('jsonwebtoken');


chai.use(chaiHttp);

describe('Index Routes', () => {
  describe('GET /', () => {
    it('should render the signuplogin page if user is not logged in', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          expect(res.text).to.include('signuplogin');
          done();
        });
    });

    
  });

  describe('GET /singleplayer', () => {
    it('should not render the singleplayer page without token', (done) => {
      chai.request(app)
        .get('/singleplayer')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.be.html;
          expect(res.text).to.include('signuplogin');
          done();
        });
    });
  });

  // Add more tests for other routes in index.js
});
