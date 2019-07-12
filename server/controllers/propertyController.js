import moment from 'moment';
import uuidv4 from 'uuid/v4';
import pool from '../utilities/connection';
import _ from 'lodash';
/*import propertyModel from '../models/propertyModel';*/
import { checkProperty } from '../middleware/inputValidator';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';



dotenv.config();
cloudinary.config(process.env.CLOUDINARY_URL);


const Property = {

  //CREATE PROPERTY
  async create(req,res) {

    try{

      const { error } = checkProperty.validate(req.body);
       if (error) return res.status(400)
        .send({
             status:400,
            'error':error.details[0].message});

      if (!req.file) return res.status(400).send('no image uploaded');
  
      const imageFile = await cloudinary.uploader.upload(req.file.path, (result) =>{
            return req.body.image_url = result.secure_url;
          });
      const upload = imageFile.secure_url;

      const creatQuery = `INSERT INTO 
            property (id, owner,price, status, state, city, address, type, image_url, created_on) 
            VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9,$10) RETURNING *`
      const values = [
            uuidv4(),
            req.user.id,
            req.body.price,
            req.body.status,
            req.body.state,
            req.body.city,
            req.body.address,
            req.body.type,
            upload,
            moment(new Date())
      ];

         
       const newProperty = await pool.query(creatQuery,values);
       const property = newProperty.rows[0];

          return res.status(201).send({
                status: 201,
                data: {
                  property
                }
              });
          }catch(error){
            console.log(error);
          }
      },


    //DELETE PROPERTY AD
  async delete(req,res){

        try{

          const deleteQuery = `DELETE FROM property WHERE id=$1 AND owner = $2 returning *`;

          const deleteProperty = await pool.query(deleteQuery,[req.params.id, req.user.id]);
             if (!deleteProperty.rowCount) return res.status(404)
                  .send({
                    status:404,
                    error: 'property not found'
                  });

              return res.status(204)
              .send({
                status:204,
                message: 'property advert deleted'
              });


        }catch(error){
            console.log(error);
        }
      },



    //UPDATE PROPERTY AD
  async update (req, res){

        try{

        const findById = `SELECT * FROM property WHERE id=$1 AND owner = $2`; 
        const updateQuery =`UPDATE property
                  SET price=$1,status=$2,state=$3,city=$4,address=$5,type=$6,image_url=$7,created_on=$8
                  WHERE id=$8 AND owner = $9 returning *`; 

        const { rows } = await pool.query(findById,[req.params.id, req.user.id]);
               if (!rows[0]) return res.status(404)
                    .send({
                      status:404,
                      error: 'property not found'
                    });


        const values = [
                req.body.price || rows[0].price,
                req.body.status || rows[0].status,
                req.body.state || rows[0].state,
                req.body.city || rows[0].city,
                req.body.address || rows[0].address,
                req.body.type || rows[0].type,
                req.body.image_url || rows[0].image_url,
                moment(new Date()),
                req.params.id,
                req.user.id
               ];

        const response = await pool.query(updateQuery,values);
        const updateProperty = response.rows[0];

              return res.status(200)
                    .send({
                    status:200,
                    data:{
                      updateProperty
                     }
                  });

              }catch(error){
                console.log(error);
              }
        
         },

    //MARK PROPERTY AD AS SOLD
     async mark(req, res){

        try{

          const findById = `SELECT * FROM property WHERE id=$1 AND owner = $2`; 
          const markQuery =`UPDATE property
                  SET price=$1,status=$2,state=$3,city=$4,address=$5,type=$6,image_url=$7,created_on=$8
                  WHERE id=$8 AND owner = $9 returning *`;  

           const { rows } = await pool.query(findById,[req.params.id, req.user.id]);
               if (!rows[0]) return res.status(404)
                    .send({
                      status:404,
                      error: 'property not found'
                    });
                  
             const values = [
                req.body.price || rows[0].price,
                req.body.status || rows[0].status,
                req.body.state || rows[0].state,
                req.body.city || rows[0].city,
                req.body.address || rows[0].address,
                req.body.type || rows[0].type,
                req.body.image_url || rows[0].image_url,
                moment(new Date()),
                req.params.id,
                req.user.id
               ];     

            const response = await pool.query(markQuery, values);
            const markProperty = response.rows[0];
            const changeStatus = await _.pick(markProperty,['status']);
              return res.status(200)
                    .json({
                        status:200,
                        changeStatus
                       });

            }catch(error){
              console.log(error);
            }
      
         },


        

   // GET A SPECIFIC PROPERTY  
     
      async getAProperty(req, res){

        try{
            const findById = `SELECT * FROM property WHERE id=$1 `;
            const foundProp = await pool.query(findById,[req.params.id]);
            const propExist =foundProp.rows[0];

            if (propExist.rowCount < 1) return res.status(404)
                    .send({
                      status:404,
                      error: 'property not found'
                    });

               return res.status(200)
               .json({
                status:200,
                data:propExist
                });
              
              }catch(error){
                console.log(error);
            }
      
          },



       //GET ALL PROPERTY

      async getAll(req, res){

        try{

          let response = [];

          const allPropQuery = 'SELECT * FROM property where owner = $1';

          const { rows } = await pool.query(allPropQuery,[req.user.id]);
          const properties = rows;

          if(typeof req.query.type != undefined){
            response = properties.filter( property =>{
              if(property.type === req.query.type){
                  return property 
              }
            })
          }

          if (Object.keys(req.query).length === 0){
            response = properties;
          }

          return res.status(200)
           .json({
            status:200,
            data:response
            });

        }catch(error){
          console.log(error);
        }
     }    

      
}
  

module.exports = Property;


