const Joi = require('joi')
module.exports = {
    createValidation: request => {
         const createSchema = {
                title: Joi.string().required(),
                description: Joi.string().required(),
                year: Joi.string().required(),
                duration: Joi.string().required(),
                price: Joi.number().required(),
                location:Joi.string().required(),
                image:Joi.string().required(),
                link:Joi.string().required(),
            }
       
        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            title: Joi.string(),
            description: Joi.string(),
            year: Joi.string(),
            duration: Joi.string(),
            price: Joi.number(),
            location:Joi.string(),
            image:Joi.string(),
            link:Joi.string(),
            
        }

        return Joi.validate(request, updateSchema)

    }
     
}