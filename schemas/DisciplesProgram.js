const Joi = require('joi');
const DisciplesProgramSchema = 
{
    title : Joi.string().min(3).required(),
    description : Joi.string().min(3).required(),
    year : Joi.string().regex(/[0-3][0-9]\-[0-1][0-9]\-[1-2][0-9][0-9][0-9]/).required(),
    duration : Joi.string(),
    price : Joi.number(),
    location : Joi.string().min(3).required(),
    image : Joi.string(),
    link : Joi.string(),
    
};
module.exports=DisciplesProgramSchema;
