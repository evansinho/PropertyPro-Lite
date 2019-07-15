import BaseJoi from 'joi';
import ImageExtension from 'joi-image-extension';

const Joi = BaseJoi.extend(ImageExtension);


export const checkSignup = Joi.object().keys({
  email:Joi.string().email().required(),
  first_name:Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  password: Joi.string()/*.regex(/^[a-zA-Z0-9]{6,16}$/)*/.min(6).required(),
  phone_number: Joi.number().min(1).required(),
  address: Joi.string().min(3)/*.regex(/^[\w\-\s]+$/)*/.required()
}).unknown(true);


export const checkSignin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string()/*.regex(/^[a-zA-Z0-9]{6,16}$/)*/.min(6).required()
});

      

 export const checkProperty = Joi.object().keys({
  status: Joi.string().required().default('available'),
  price: Joi.number().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().min(3).required(),
  type: Joi.string()/*.regex(/^[\w\-\s]+$/)*/.required(),   
  image_url: Joi.string()
}).unknown(true);


 export const checkFlag = Joi.object().keys({
 reason:Joi.string().min(3).required(),
 description:Joi.string().min(3).required()
});
