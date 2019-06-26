const Joi = require('joi');
module.exports  ={
    registerValidation :  request =>{
            const registerDiscipleSchema = 
            {              
                            type: Joi.string().valid("disciple").required(),
                            firstName : Joi.string().min(3).required(),
                            lastName : Joi.string().min(3).required(),
                            birthDate : Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/).required(),
                            bio : Joi.string().empty('').default('default value'),
                            email : Joi.string().regex(/[a-z0-9\.\_\-]+\@[a-z]+\.com$/).required(),
                            password : Joi.string().min(8).required(),
                            house : Joi.string().required().valid("Neutral","Pegasus","Orion")
                           
                           
            }
            return Joi.validate(request, registerDiscipleSchema)
    },
    updateValidationAdmin :  request =>{
        const updateValidationAdmin = 
        {               
                        
         house : Joi.string().required().valid("Neutral","Pegasus","Orion"),
         score:Joi.Number()
                       
        }
        return Joi.validate(request, updateValidationAdmin)
},
    updateValidationUser :  request =>{
        const updateValidationUser = 
        {               
                        
            firstName : Joi.string().min(3),
            lastName : Joi.string().min(3),
            birthDate : Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
            bio : Joi.string(),
            password : Joi.string().min(8),                   
                    
        }
        return Joi.validate(request, updateValidationUser)
    }
};


