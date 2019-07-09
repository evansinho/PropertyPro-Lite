import pool from '../utilities/connection';
import { checkFlag } from '../middleware/inputValidator';
import moment from 'moment';
import uuidv4 from 'uuidv4';



const Flag = {

    //CREATE A FLAG
     async createFlag(req,res){

      try{

        const { error } = checkFlag.validate(req.body);
            if (error) return res.status(400)
                .send({
                status:400,
                'error':error.details[0].message});

        const flagQuery = `INSERT INTO 
            flags ( id, property_id, created_on, reason, description ) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [
                uuidv4(),
                uuidv4(),
                moment(new Date()),
                req.body.reason,
                req.body.description
              ]; 

        let newFlag = await pool.query(flagQuery, values); 
            newFlag = newFlag.rows[0];
        
          return res.status(200)
              .send({
                status: 200,
                newFlag
                }); 

            }catch(error){
              console.log(error);
            }
        }
    
    }  

module.exports = Flag
