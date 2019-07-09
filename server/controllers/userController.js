import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../utilities/connection';
/*import userModel from '../models/userModel';*/
import { checkSignup, checkSignin } from '../middleware/inputValidator';
import moment from 'moment';
import uuidv4 from 'uuidv4';

dotenv.config();
const SECRET = process.env.JWT_KEY;



const User = {

  //USER SIGNUP controller
async signUp(req, res) {

  try{  

    const { error } = checkSignup.validate(req.body);
     if (error) return res.status(400)
        .send({
        status:400,
        'error':error.details[0].message});

    const hashedPasword = await bcrypt.hash(req.body.password, 10);

    const text = 'SELECT * FROM users WHERE email = $1';
    const createQuery = `INSERT INTO 
            users (id, email, first_name, last_name, password, phone_number, address, is_admin) 
            VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8) RETURNING *`;
      const values = [
            uuidv4(),
            req.body.email,
            req.body.first_name,
            req.body.last_name,
            hashedPasword,
            req.body.phone_number,
            req.body.address,
            req.body.is_admin
      ];


    const userExist = await pool.query(text,[req.body.email]);
      if (userExist.rowCount) return res.status(409)
          .send({
                status:409,
                'error':'Email address has been used'
              });


    let newUser = await pool.query(createQuery, values); 
        newUser = newUser.rows[0];

    const token = jwt.sign({id: newUser.id, is_admin: newUser.is_admin}, SECRET, { expiresIn: '24h' });

      return res.header('x-auth-token', token).status(201)
            .send({
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
          .send({
          status:400,
          error:error.details[0].message});

    const text = 'SELECT * FROM users WHERE email = $1';    

    const user = await pool.query(text,[req.body.email]);
    if (!user.rowCount) return res.status(401)
      .send({
      status:401,
      error:'Invalid email or password.'});

    const validPassword = await bcrypt.compare(req.body.password,  user.rows[0].password);
    if (!validPassword) return res.status(401)
      .send({
        status:401,
        error:'Invalid email or password.'});

    const token = jwt.sign(req.body, SECRET, { expiresIn: '1hr' });

    return res.header('x-auth-token', token).status(200)
        .send({
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
