const Joi = require('joi');
module.exports  ={
     registerParentValidation : request =>{
            const registerParentValidation = 
            {      type: Joi.string().valid("parent").required(),

                firstName : Joi.string().min(3).required(),
                lastName : Joi.string().min(3).required(),
                birthDate : Joi.string().required().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
                bio :Joi.string().empty('').default('default value'),
                email : Joi.string().regex(/[a-z0-9\.\_\-]+\@[a-z]+\.com$/).required(),
                password : Joi.string().min(8).required(),
                
            }
        return Joi.validate(request, registerParentValidation)
    } ,       
    updateParentValidationUser: request =>{
        const updateParentValidationUser = 
        {
            firstName : Joi.string().min(3),
            lastName : Joi.string().min(3),
            birthDate : Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
            bio : Joi.string(),
            password : Joi.string().min(8),
            
        }
    return Joi.validate(request, updateParentValidationUser)
} 

};


