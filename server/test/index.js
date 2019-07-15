import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import './user.test';
import './property.test';

const { expect } = chai;
chai.use(chaiHttp);