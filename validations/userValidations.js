const Joi = require("joi");

module.exports = {
  //register schema for use except alumni
  registerValidation: request => {
    const registerSchema = {
      type: Joi.string().valid("member").required(),
      firstName: Joi.string()
        .min(3)
        .required(),
      lastName: Joi.string()
        .min(3)
        .required(),
      birthDate: Joi.string().required().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
      bio: Joi.string().empty('').default('default value'),
      email: Joi.string()
        .regex(/[a-z0-9\.\-]+\@student\.guc\.edu\.eg$/)
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      house: Joi.string().required().valid("Neutral","Pegasus","Orion"),
      din: Joi.string().required(),
      tiqStatus:Joi.string().empty('').default('default value').valid("House Leader","BOA","Supervisor","Disciples House Leader",""),
      supervisorType:Joi.string().valid("Marketing","Fundraising","Logistics","Relations","Media Design").required() 
        };
    return Joi.validate(request, registerSchema);
  },

  loginValidation: request => {
    const loginSchema = {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    };
    return Joi.validate(request, loginSchema);
  },

  

  updateValidationAdmin: request => {
    const updateValidationAdmin = {
      house: Joi.string(),
      din: Joi.string(),
      tiqStatus:Joi.string().valid("House Leader","BOA","Supervisor","Disciples House Leader"), 
      supervisorType:Joi.string().valid("Marketing","Fundraising","Logistics","Relations","Media Design"),
      score:Joi.Number() 
     
    };
    return Joi.validate(request, updateValidationAdmin);
  },
  updateUserValidation: request => {
    const updateUserSchema = {
   
      firstName: Joi.string().min(3),
      lastName: Joi.string().min(3),
      birthDate: Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
      bio: Joi.string(),
      password: Joi.string().min(8),

     
    
    };
    return Joi.validate(request, updateUserSchema);
  }
};
