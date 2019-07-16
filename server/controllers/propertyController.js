import moment from 'moment';
import pool from '../utilities/connection';
import _ from 'lodash';
/*import propertyModel from '../models/propertyModel';*/
import { checkProperty } from '../middleware/inputValidator';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import {createPropQuery, 
        deleteQuery,
        idCheckQuery,
        updateQuery,
        allPropQuery} from '../utilities/query';




dotenv.config();
cloudinary.config(process.env.CLOUDINARY_URL);


const Property = {

  async create(req,res) {
    try{
      console.log(req.body);
      
      const { error } = checkProperty.validate(req.body);
         if (error) return res.status(400)
          .json({
             status:400,
             "error": error.details[0].message
               });

      const imageFile = await cloudinary.uploader.upload(req.file.path, (result) =>{
            return req.body.image_url = result.secure_url;
          });
      const upload = imageFile.secure_url;

      const values = [
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

       const newProperty = await pool.query(createPropQuery,values);
       const data = newProperty.rows[0];

          return res.status(201).json({
                status: 201,
                data
              });
          }catch(error){
            console.log(error);
            }
          },


  async delete(req,res){
      try{
        const deleteProperty = await pool.query(deleteQuery,[req.params.id, req.user.id]);
             if (!deleteProperty.rowCount) return res.status(404)
                  .json({
                    "status":404,
                    "error": 'property not found'
                  });

              return res.status(204)
              .json({
                status:204,
                message: 'property advert deleted'
              });

            }catch(error){
                console.log(error);
            }
          },


  async update (req, res){
      try{
        const { rows } = await pool.query(idCheckQuery,[req.params.id, req.user.id]);
                 if (!rows[0]) return res.status(404)
                    .json({
                      "status":404,
                      "error": 'property not found'
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
        const data = response.rows[0];

              return res.status(200)
                    .json({
                      status:200,
                      data
                    });

              }catch(error){
                console.log(error);
              }
            },

 
  async mark(req, res){
      try{  
        const { rows } = await pool.query(idCheckQuery,[req.params.id, req.user.id]);
               if (!rows[0]) return res.status(404)
                    .json({
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

        const response = await pool.query(updateQuery, values);
        const markProperty = response.rows[0];
        const data = await _.pick(markProperty,['status','created_on']);
              return res.status(200)
                    .json({
                        status:200,
                        data
                       });

            }catch(error){
              console.log(error);
            }
          },


  async getAProperty(req, res){
      try{
        const { rows, rowCount } = await pool.query(idCheckQuery,[req.params.id,req.user.id]);
            if (!rowCount) return res.status(404)
                    .json({
                      "status":404,
                      "error": 'property not found'
                    });

            const data = rows[0];

               return res.status(200)
               .json({
                status:200,
                data
                });
              
              }catch(error){
                console.log(error);
              }
            },


  async getAll(req, res){
      try{
        let data = [];

        const { rows } = await pool.query(allPropQuery,[req.user.id]);
        const properties = rows;

          if(typeof req.query.type != undefined){
            data = properties.filter( property =>{
              if(property.type === req.query.type){
                  return property 
              }
            })
          }

          if (Object.keys(req.query).length === 0){
            data = properties;
          }

          return res.status(200)
           .json({
              status:200,
              data
            });

        }catch(error){
          return res.status(400)
           .json({
              "status":400,
              "error": error
           });
         }
      }    

}
  

module.exports = Property;


