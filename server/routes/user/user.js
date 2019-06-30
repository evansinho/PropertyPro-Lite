import express from 'express';
import User from '../../controllers/userController';

const auth = express.Router();

auth.post('/signup', User.signUp);



module.exports = auth;