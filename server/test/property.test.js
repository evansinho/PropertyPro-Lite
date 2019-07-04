import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import {
  badPropertyDetail,
  updatePropertyDetail,
  markProperty,
  goodPropertyDetail } from './mockData/propertyMockData';

const { expect } = chai;
chai.use(chaiHttp);


//CREATE A PROPERTY

describe('Create a property', () => {
  it('should create a new property with complete input and return status of 201', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .send(goodPropertyDetail)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  it('should return create property validation error', (done) => {
    chai
      .request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .send(badPropertyDetail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

//MARK A PROPERTY AS SOLD

describe('MARK a property as SOLD', () => {
  it('should mark a property as sold and display a success message', (done) => {
    chai
      .request(app)
      .patch('/api/v1/property/223343/sold')
      .set('Accept', 'application/json')
      .send(markProperty)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data).to.have.property('status').eql('sold');
        expect(res.body.message).to.equal('property marked as sold');
        done();
      });
  });
});

 //UPDATE PROPERTY

describe('UPDATE a property', () => {
  it('should update a property given the id', (done) => {
    chai
      .request(app)
      .patch('/api/v1/property/223343')
      .set('Accept', 'application/json')
      .send(updatePropertyDetail)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data).to.have.property('type');
        expect(res.body.data).to.have.property('state');
        expect(res.body.data).to.have.property('city');
        expect(res.body.data).to.have.property('address');
        expect(res.body.data).to.have.property('price');
        expect(res.body.data).to.have.property('image_url');
        expect(res.body.message).to.equal('property updated');
        done();
      });
    });
  });

//DELETE PROPERTY TEST SUIT

describe('DELETE a property', () => {
  it('should remove a property and display a success message', (done) => {
    chai
      .request(app)
      .delete('/api/v1/property/1234')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.message).to.eql('property successfully deleted');
        done();
      });
  });
  it('should display an error 404 message if property is not available', (done) => {
    chai
      .request(app)
      .delete('/api/v1/property/190')
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});


//GET ALL PROPERTIES

describe('Get all PROPERTIES', () => {
  it('should get all the properties in the db', (done) => {
    chai
      .request(app)
      .get('/api/v1/property')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});


//GET A SPECIFIC PROPERTY

describe('Get a property', () => {
  it('should get an available property present in db', (done) => {
    chai
      .request(app)
      .get('/api/v1/property/3678897')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });


  it('should return an error if the property is not in the db', (done) => {
    chai
      .request(app)
      .get('/api/v1/property/23')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('error').eql('property not found');
        expect(res.body.data).to.be.a('object');
        done();
      });
  });

  it('should return an error if the ID is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/property/NOT_A_NUMBER')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('error').eql('invalid property ID');
        expect(res.body.data).to.be.a('object');
        done();
      });
    });
  });


//GET ALL PROPERTY OF A SPECIFIC TYPE

describe('GET all PROPERTY of specific type', () => {
  it('should return all property of a specific type', (done) => {
    chai
      .request(app)
      .get('/api/v1/property?type=1 bedroom')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
    });

  it('should return an error if property type is invalid', (done) => {
    chai
    .request(app)
    .get('/api/v1/property?type=thioff')
    .set('Accept', 'application/json')
    .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('error').eql('invalid property type');
        expect(res.body.data).to.be.a('object');
        done();
      });
    });
  });


