import Joi from 'joi';


export const checkSignup = Joi.object().keys({
  email:Joi.string().email().required(),
  first_name:Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
  phoneNumber: Joi.number().min(1).required(),
  is_admin: Joi.boolean().default(false),
  address:Joi.string().min(3)
});


export const checkSignin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
});

      