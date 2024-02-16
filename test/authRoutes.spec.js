const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../app'); // Assuming your app file is named 'app.js'
const expect = chai.expect;

chai.use(chaiHttp);

describe('JWT Authentication', () => {
  let token; // To store the JWT token

  before((done) => {
    // Generate a JWT token for testing
    token = jwt.sign({ email: 'test@example.com', username: 'testuser' }, process.env.JWT_KEY, { expiresIn: '1h' });
    done();
  });

  it('should return status 401 for protected route without token', (done) => {
    chai.request(app)
      .get('/dashboard')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should return status 200 for protected route with valid token', (done) => {
    chai.request(app)
      .get('/dashboard')
      .set('Cookie', `jwtToken=${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return status 401 for protected route with invalid token', (done) => {
    const invalidToken = 'invalid_token';
    chai.request(app)
      .get('/dashboard')
      .set('Cookie', `jwtToken=${invalidToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
