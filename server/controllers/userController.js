import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../utilities/connection';
import query from '../utilities/queries';
/*import userModel from '../models/userModel';*/
import { checkSignup, checkSignin } from '../middleware/inputValidator';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

dotenv.config();
const SECRET = process.env.JWT_KEY;



const User = {

  //USER SIGNUP controller
async signUp(req, res) {

   const { error } = checkSignup.validate(req.body);
     if (error) return res.status(400)
        .json({
        status:400,
        'error':error.details[0].message});

    const { id,email, first_name, last_name, password, phoneNumber, address, is_admin, createdOn}= req.body     
    const hashedPasword = await bcrypt.hash(req.body.password, 10);

  try{  

    const userExist = await pool.query(query.findUserByEmail(/*req.body.email*/email));
      if (userExist.rowCount) return res.status(409)
          .json({
                status:409,
                'error':'Email address has been used'
              });


    let newUser = await pool.query(query.createUser(id, email, first_name, last_name, hashedPasword, phoneNumber, address, is_admin, createdOn)); /*pool.query(creatQuery,values);*/
        newUser = newUser.rows[0];

    const token = jwt.sign({id: newUser.id, is_admin: newUser.is_admin}, SECRET, { expiresIn: '24h' });

      return res.header('x-auth-token', token).status(201).json({
              status: 201,
              data: {
                token,
                newUser
              }
            });

        }catch(error){
          
          console.log(error);
     }  
   },



  //USER SIGNIN controller
  async signIn(req, res) {    

    try{

    const { error } = checkSignin.validate(req.body);
    if (error) return res.status(400)
      .json({
      status:400,
      error:error.details[0].message});

    const user = await pool.query(query.findUserByEmail(req.body.email));
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

    return res.header('x-auth-token', token).status(200).json({
          status: 200,
          data: {
            token,
          }
        });
      }catch(error){
    console.log(error)
    }
 }


};

module.exports = User;
