import _ from 'lodash';
import propertyModel from '../models/propertyModel';
import { checkProperty } from '../middleware/inputValidator';
/*import dotenv from 'dotenv';*/
import cloudinary from 'cloudinary';


// fix issues with cloudinary and environmental viraiable
/*dotenv.config();*/
/*cloudinary.config(process.env.CLOUDINARY_URL);
*/

cloudinary.config({
  cloud_name: 'evansinho', 
  api_key: '795759144763958', 
  api_secret: 'e8Rb4Pt3PHUEN5bRc9o6mFODSEY'
})




const Property = {

  //CREATE PROPERTY
  async create(req,res) {

    try{

      if (!req.file) return res.status(400).send('no image uploaded');

      const { error } = checkProperty.validate(req.body);
       if (error) return res.status(400)
        .json({
           status:400,
            'error':error.details[0].message});

      const propertyExist = await propertyModel.findAddress(req.body.address);
            if (propertyExist) return res.status(409)
              .json({
                    status:409,
                    'error':'property AD exist'
                  });

      const imageFile = await cloudinary.uploader.upload(req.file.path, (result) =>{
            return req.body.image_url = result.secure_url;
          });     

     const newProperty = await propertyModel.createProperty(req.body);
        newProperty.image_url = imageFile.secure_url;

    return res.status(201).json({
          status: 201,
          data: {
            newProperty
          }
        });
    }catch(error){
      console.log(error);
    }
  },



    //DELETE PROPERTY AD
  async delete(req,res){

    try{

    const property = await propertyModel.findOne(req.params.id);
       if (!property) return res.status(404)
            .json({
              status:404,
              error: 'property not found'
            });

    const deleteProperty = await propertyModel.delete(req.params.id);
       return res.status(204)
          .json({
          	status:204,
          	data:{
          		message: 'propert advert deleted'
          	}	
          });

    }catch(error){
      console.log(error);
     }
   },


     //UPDATE PROPERTY AD
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
	
  	     },

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
        const mark = await _.pick(markProperty,['status']);
          return res.status(200)
                .json({
                    status:200,
                     mark
                   });

  			}catch(error){
  				console.log(error);
  			}
	
  	     },

     //GET ALL PROPERTY

  	  async getAll(req, res){

  			try{

          let response = [];

          if (req.query.propType === undefined)
            return res.status(400)
              .json({
                status:400,
                message:'propType does not exist'
              })
          
        	const properties = await propertyModel.findAll();

          if(typeof req.query.propType != undefined){

            properties.filter( property =>{

              if(property.propType === req.query.propType){
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
   },

  	 // GET A SPECIFIC PROPERTY  
  	 
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
	
  	 },  

      
}
  

module.exports = Property;

