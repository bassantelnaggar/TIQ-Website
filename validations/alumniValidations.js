const Joi = require("joi");

module.exports = {
  registerValidation: request => {
    const registerAlumniSchema = {
      type: Joi.string().valid("alumni").required(),
      firstName: Joi.string()
        .min(3)
        .required(),
      lastName: Joi.string()
        .min(3)
        .required(),
      birthDate: Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/).required(),
      bio: Joi.string().empty('').default('default value'),
      email: Joi.string()
        .regex(/[a-z0-9\.\-]+\@student\.guc\.edu\.eg$/)
        .required(),
      password: Joi.string()
        .min(8)
        .required(),

      house: Joi.string().required().valid("Neutral","Pegasus","Orion"),
      din: Joi.string().required().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
      dor: Joi.string().required().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
    };
    return Joi.validate(request, registerAlumniSchema);
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
    const updateAlumniSchemaAdmin = {
      
      din: Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
      dor: Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
      type:Joi.string(),
      house:Joi.string().valid("Neutral","Pegasus","Orion") 
    };
    return Joi.validate(request, updateAlumniSchemaAdmin);
  },
  updateValidationUser: request => {
    const updateAlumniSchemaUser = {
      
      firstName: Joi.string()
      .min(3),
    lastName: Joi.string()
      .min(3),
    birthDate: Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
    bio: Joi.string(),
    
    password: Joi.string()
      .min(8)
   
     
    };
    return Joi.validate(request, updateAlumniSchemaUser);
  }
};
