import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel';
import { checkSignup, checkSignin } from '../middleware/inputValidator';

dotenv.config();
const SECRET = process.env.JWT_KEY;



const User = {

  //USER SIGNUP controller
  async signUp(req, res) {
    const { error } = checkSignup.validate(req.body);
    if (error) return res.status(400)
    	.json({
    	status:400,
    	error:error.details[0].message});

    const userExist = await userModel.findOne(req.body.email);
    if (userExist) return res.status(409)
    	.json({
    	      status:409,
            error:'Email address has been used'
          });

    const newUser = await userModel.createUser(req.body);
    
    newUser.password = await bcrypt.hash(req.body.password, 10);

    const token = jwt.sign(newUser, SECRET, { expiresIn: '1hr' });

    return res.status(201).json({
          status: 201,
          data: {
            token,
            newUser
          }
        });
      },


  //USER SIGNIN controller
  async signIn(req, res) {    
    const { error } = checkSignin.validate(req.body);
    if (error) return res.status(400)
      .json({
      status:400,
      error:error.details[0].message});

    const user = await userModel.findOne(req.body.email);
    if (!user) return res.status(401)
      .json({
      status:401,
      error:'Invalid email or password.'});

    const validPassword = await bcrypt.compare(req.body.password,  user.password);
    if (!validPassword) return res.status(401)
      .json({
        status:401,
        error:'Invalid email or password.'});

    const token = jwt.sign(req.body, SECRET, { expiresIn: '1hr' });

    return res.status(200).json({
          status: 200,
          data: {
            token,
          }
        });
      },
  }

module.exports = User;
