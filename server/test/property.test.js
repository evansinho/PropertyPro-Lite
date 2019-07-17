import fs from 'fs';
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


describe('Create user token', () => {
  it('should signin user successfully', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(goodSignInDetail);

      expect(response.status).to.equal(200);
      expect(response.body.data.token).to.be.a('string');
       adminToken =  response.body.data.token;
    });
 });


  describe('Create property', () => {
    it('should return create property validation error', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/property')
        .set('Authorization', adminToken)
        .send(badPropertyDetail);

      expect(response.status).to.equal(400);
    });

    it('should be able to create a property AD', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/property')
        .set('Authorization', adminToken)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .field('status', 'available')
        .field('price', '150000')
        .field('state', 'lagos')
        .field('city', 'illupeju')
        .field('address', '8 okoko road')
        .field('type', '3 bedroom')
        .attach('image_url',
        /*fs.readFileSync('/Users/user/Downloads/assets/apart.jpg'),
        'apart.jpg'*/https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80);

      expect(response.status).to.equal(201);
    });
  });


  describe('Update property', () => {
    it('should return an error if the property is not in the db', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/245')
        .set('Authorization', adminToken)
        .send(updatePropertyDetail);

      expect(response.status).to.equal(404);
    });

    it('should update a property given the id', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/1')
        .set('Authorization', adminToken)
        .send(goodSignInDetail);

      expect(response.status).to.equal(200);
    });
  });


  describe('MARK property', () => {
    it('should return an error if the property is not in the db', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/276/sold')
        .set('Authorization', adminToken)
        .send(updatePropertyDetail);

      expect(response.status).to.equal(404);
    });

    it('should mark a property as sold', async () => {
      const response = await chai
        .request(app)
        .patch('/api/v1/property/1/sold')
        .set('Authorization', adminToken)
        .send(goodSignInDetail);

      expect(response.status).to.equal(200);
    });
  });    


  describe('Get all properties', () => {
    it('should get all the properties in the db', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property')
        .set('Authorization', adminToken)

      expect(response.status).to.equal(200);
    });
  }); 

    
  describe('Get a property', () => {
    it('should return an error if the property is not in the db', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property/23')
        .set('Authorization', adminToken)

      expect(response.status).to.equal(404);
    });

    it('should return a property of valid id', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property/1')
        .set('Authorization', adminToken)

      expect(response.status).to.equal(200);
    });
  });    


  describe('GET all PROPERTY of specific proptype', () => {
    it('should return all property of a specific proptype', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/property?type=3 bedroom')
        .set('Authorization', adminToken)

      expect(response.status).to.equal(200);
    });
  });     


  describe('Delete Product', () => {
    it('should display an error 404 message if property is not available', async () => {
      const response = await chai
        .request(app)
        .del('/api/v1/property/12')
        .set('Authorization', adminToken);

      expect(response.status).to.equal(404);
    });

    it('user should be able to delete a property', async () => {
      const response = await chai
        .request(app)
        .del('/api/v1/property/1')
        .set('Authorization', adminToken);

      expect(response.status).to.equal(204);
    }); 
  });
