import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  goodSignUpDetail,
  goodSignUpDetail2,
  badSignUpDetail,
  goodSignInDetail,
  badSignInDetail1,
  badSignInDetail2,
  badSignInDetail3} from './mockData/userMockData';


const { expect } = chai;
chai.use(chaiHttp);



//USER SIGNUP TEST
describe('User', () => {
  describe('Sign up User', () => {
    it('should return status code 201 and create a new user', (done)=> {
      chai
      .request(app)
        .post('/api/v1/auth/signup')
          .send(goodSignUpDetail)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.have.property('token');
            expect(res.body.data).to.be.a('object');
            done();
      });
    });
  });


  // test if email already exists
  it('should return a user conflict error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(goodSignUpDetail2)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        expect(res.body).to.have.property('error').eql('Email address has been used');
        done();
      });
  });

      // test if there is a validation error
  it('should return a user validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(badSignUpDetail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});


//TEST FOR SIGNIN USERS
describe('User signin test suite', () => {
  it('should signin user successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(goodSignInDetail)
      .end((err,res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });
  

  // signin validation
  it('should return a User validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(badSignInDetail3)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  //if user doesn't exist
  it('should return a User auth error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(badSignInDetail1)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  // test if user exists but wrong password
  it('should return a User auth error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(badSignInDetail2)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});


