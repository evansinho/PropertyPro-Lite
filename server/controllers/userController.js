import nodemailer from 'nodemailer';
import async from 'async';
import crypto from 'crypto';
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
        .json({
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
          .json({
                status:409,
                'error':'Email address has been used'
              });


    let newUser = await pool.query(createQuery, values); 
        newUser = newUser.rows[0];

    const token = jwt.sign({id: newUser.id, is_admin: newUser.is_admin}, SECRET, { expiresIn: '24h' });

      return res.header('x-auth-token', token).status(201)
            .json({
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

    const text = 'SELECT * FROM users WHERE email = $1';    

    const user = await pool.query(text,[req.body.email]);
    if (!user.rowCount) return res.status(401)
      .json({
      status:401,
      error:'Invalid email or password.'});

    const validPassword = await bcrypt.compare(req.body.password,  user.rows[0].password);
    if (!validPassword) return res.status(401)
      .json({
        status:401,
        error:'Invalid email or password.'});

    const token = jwt.sign(req.body, SECRET, { expiresIn: '1hr' });

    return res.header('x-auth-token', token).status(200)
        .json({
          status: 200,
          data: {
            token,
          }
        });
      }catch(error){

    console.log(error)
    
    }
 },

/*
 //FORGOT PASSWORD 
  forgot_password(req,res,next){
    const text = 'SELECT * FROM users WHERE email = user.email';
        async.waterfall([
            function(done) {
              crypto.randomBytes(20, function(err, buf) {
                const token = buf.toString('hex');
                done(err, token);
              });
            },

        function(token, done) {
          const user =  pool.query(text,[req.body.email]);
              if (!user.rowCount) return res.status(409)
                .send({
                    status:409,
                    'error':'User not found'
                     });

          const updateQuery =`UPDATE users
                  SET resetPasswordToken=$1,resetPasswordExpires=$2,
                  WHERE email=$3 *`;    

          const values= [ 
                    user.token,
                    user.Date.now() + 3600000,
                    user.email
                      ];
          const response =  pool.query(updateQuery, values);
            return done(err, token, user);              

        },

        function(token, user, done) {
            const smtpTransport = nodemailer.createTransport({
              service: 'Gmail', 
              auth: {
                user: 'igiri.evanson@gmail.com',
                pass: process.env.GMAILPASSWORD
              }
            })

             const mailOptions = {
                to: user.email,
                from: 'igiri.evanson@gmail.com',
                subject: 'PropertyPro Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://' + req.headers.host + '/reset_password/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
              };  

            smtpTransport.sendMail(mailOptions, function(err) {
                  if(!err) return res.json({'success' 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
                            return done(err);
                });
               },
            ], 
            function(err) {
              if (err) return
              res.status(422).json({message:err});
             });
            }



 async reset_password(req, res) {
     
      }*/


};



module.exports = User;
