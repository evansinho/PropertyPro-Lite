import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  badPropertyDetail,
  updatePropertyDetail,
  markProperty,
  goodPropertyDetail } from './mockData/propertyMockData';
import { goodSignInDetail } from './mockData/userMockData'; 
 
  
const { expect } = chai;
chai.use(chaiHttp);

let adminToken


describe('property', () => {
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(goodSignInDetail);
    adminToken = response.body.data.token;
    console.log(adminToken);
   });
 });


  describe('Create property', () => {
    it('should return create property validation error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(badPropertyDetail);

      expect(response.status).to.equal(400);
    });

    it('should be able to create a property AD', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(goodPropertyDetail);

      expect(response.status).to.equal(201);
    });
  });


  describe('Update property', () => {
    it('should return an error if the property is not in the db', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/245')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatePropertyDetail);

      expect(response.status).to.equal(404);
    });

    it('should update a property given the id', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/2')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(goodSignInDetail);

      expect(response.status).to.equal(200);
    });
  });


  describe('MARK property', () => {
    it('should return an error if the property is not in the db', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/223343/sold')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatePropertyDetail);

      expect(response.status).to.equal(404);
    });

    it('should mark a property as sold', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/223343/sold')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(goodSignInDetail);

      expect(response.status).to.equal(200);
    });
  });    


  describe('Get all properties', () => {
    it('should get all the properties in the db', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).to.equal(200);
    });
  }); 

    
  describe('Get a property', () => {
    it('should return an error if the property is not in the db', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property/23')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).to.equal(404);
    });

    it('should return a property of valid id', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property/1')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).to.equal(200);
    });
  });    


  describe('GET all PROPERTY of specific proptype', () => {
    it('should return all property of a specific proptype', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property?type=1 bedroom')
        .set('Authorization', `Bearer ${adminToken}`)

      expect(response.status).to.equal(200);
    });
  });     


  describe('Delete Product', () => {
    it('should display an error 404 message if property is not available', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/property/1234')
        .set('Authorization', `Bearer ${ownerToken}`);

      expect(response.status).to.equal(404);
    });

    it('user should be able to delete a property', async () => {
      const response = await chai
        .request(app)
        .delete('/api/v1/property/1234')
        .set('Authorization', `Bearer ${ownerToken}`);

      expect(response.status).to.equal(200);
    }); 
  });
