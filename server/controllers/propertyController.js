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
        .json({
             status:400,
            'error':error.details[0].message});

      if (!req.file) return res.status(400).send('no image uploaded');
  
      const imageFile = await cloudinary.uploader.upload(req.file.path, (result) =>{
            return req.body.image_url = result.secure_url;
          });
      const upload = imageFile.secure_url;

      const creatQuery = `INSERT INTO 
            property (id, owner, status, state, city, address, type, image_url, created_on) 
            VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9) RETURNING *`
      const values = [
            uuidv4(),
            req.user.id,
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

          return res.status(201).json({
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
                  .json({
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

      }




 



      
}
  

module.exports = Property;





    /* //UPDATE PROPERTY AD
    async update (req, res){

        try{

    const property = await propertyModel.findOne(req.params.id);
           if (!property) return res.status(404)
                .json({
                  status:404,
                  error: 'property not found'
                });

        const updatedProperty = await propertyModel.update(req.params.id, req.body);
          return res.status(200)
                .json({
                    status:200,
                    data:{
                     updatedProperty
                    }
                   });

        }catch(error){
          console.log(error);
        }
  
         },*/
/*
     //MARK PROPERTY AD AS SOLD

     async mark(req, res){

        try{

    const property = await propertyModel.findOne(req.params.id);
           if (!property) return res.status(404)
                .json({
                  status:404,
                  error: 'property not found'
                });

        const markProperty = await propertyModel.update(req.params.id, req.body);
        const changeStatus = await _.pick(markProperty,['status']);
          return res.status(200)
                .json({
                    status:200,
                     changeStatus
                   });

        }catch(error){
          console.log(error);
        }
  
     },*/

    /* //GET ALL PROPERTY

      async getAll(req, res){

        try{

          let response = [];

   
          const properties = await propertyModel.findAll();

          if(typeof req.query.type != undefined){

            properties.filter( property =>{

              if(property.type === req.query.type){
                response.push(property);
              }
            })
          }

          response = _.uniqBy(response, 'id');

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
   },*/

    /* // GET A SPECIFIC PROPERTY  
     
      async getAProperty(req, res){

        try{

        const oneProperty = await propertyModel.findOne(req.params.id);
         if (!oneProperty) return res.status(404)
                .json({
                  status:404,
                  error: 'property not found'
                });

         return res.status(200)
         .json({
          status:200,
          data:[oneProperty]
          });
        
        }catch(error){
          console.log(error);
        }
  
     },  */
