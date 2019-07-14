import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  goodSignUpDetail,
  badSignUpDetail,
  goodSignInDetail,
  badSignInDetail1,
  badSignInDetail2,
  badSignInDetail3} from './mockData/userMockData';



const { expect } = chai;
chai.use(chaiHttp);

let token;

describe('User', () => {
  describe('Signup User', () => {
   it('should return a User validation error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(badSignUpDetail);

      expect(response.status).to.equal(400);
    });

    it('should return status code 201 and create a new user', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(goodSignUpDetail);

      expect(response.status).to.equal(201);
    });
       
    it('It should return a conflict error when account already exists', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(goodSignUpDetail);

      expect(response.status).to.equal(409);
    });
  });


  describe('Signin User', () => {
    it('should return a User validation error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(badSignInDetail3);

      expect(response.status).to.equal(400);
    });

    it('should return a User auth error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')   //wrong email
        .send(badSignInDetail1);
      expect(response.status).to.equal(401);
    });

    it('should return a User auth error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')   //wrong password
        .send(badSignInDetail2);
      expect(response.status).to.equal(401);
    });

      it('should signin user successfully', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(goodSignInDetail);

      expect(response.status).to.equal(200);
      expect(response.body.data.token).to.be.a('string');
       token = response.body.data.token;
    });
  });
});  