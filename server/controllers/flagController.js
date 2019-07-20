import pool from '../utilities/connection';
import { checkFlag } from '../middleware/inputValidator';
import moment from 'moment';
import uuidv4 from 'uuidv4';
import { flagQuery } from '../utilities/queries';



const Flag = {

     async createFlag(req,res){
      try{
        const { error } = checkFlag.validate(req.body);
            if (error) 
              return res.status(400).send({status:400,'error':error.details[0].message});

        const values = [moment(new Date()),req.body.reason,req.body.description]; 

        let data = await pool.query(flagQuery, values); 
            data = data.rows[0];
        
          return res.status(201).send({status: 201,data}); 
            }catch(error){
              console.log(error);
             }
           }
    
    }  

module.exports = Flag
