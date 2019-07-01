
const mongoose = require('mongoose');

const debateSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title : String ,
    category : String,
    date  : Date,
    description : String,
    info : String,
    debatePicture:{
        type:String,
        default: "https://res.cloudinary.com/dpny1nhaq/image/upload/v1561833946/debatecover_bzhfr9.jpg"
      }
}) 
module.exports = debates = mongoose.model('debates',debateSchema)

