const Joi = require('joi');



module.exports  ={
    updateTIQadmin :request =>{
            const updateTIQadminSchema = 
            {      type: Joi.string().valid("TIQadmin").required(),

                firstName : Joi.string().min(3),
                lastName : Joi.string().min(3),
                birthDate : Joi.string().regex(/[1-2][0-9][0-9][0-9]\-[0-1][0-9]\-[0-3][0-9]/),
                bio : Joi.string(),
                password : Joi.string().min(8),
                house : Joi.string().valid("Neutral","Pegasus","Orion"),
                din : Joi.string(),
                dor : Joi.string(),
                tiqStatus:Joi.string(),
                supervisorType:Joi.string()            
            }
            return Joi.validate(request,updateTIQadminSchema)
    }

};
