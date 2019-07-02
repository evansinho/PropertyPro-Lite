import propertyModel from '../models/propertyModel';
import { checkProperty } from '../middleware/inputValidator';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';



dotenv.config();
cloudinary.config({ 
  cloud_name: 'evansinho', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



const Property = {

  //CREATE PROPERTY
  async create(req, res) {

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
              deleteProperty
          });

    }catch(error){
      console.log(error);
     }
   }



      
}
  

module.exports = Property;
