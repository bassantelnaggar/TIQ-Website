const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const signedUpSchema = new Schema({
  type: {
    type: String,
    required: true,  
    enum: ["House Leader","BOA","Supervisor","Disciples House Leader"]

  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  house: {
    type: String
  },
  score: {
    type: Number,
    default: 0
  },
  din: {
    type: String
  },
  dor: {
    type: String
  },

  
  notification: {
    type: [String]
  },
  tiqStatus: {
    type: String,
    enum: ["House Leader","BOA","Supervisor","Disciples House Leader"]
  },
  supervisorType:{
    type:String,
    enum:["Marketing","Fundraising","Logistics", "Relations","Media Design"]
  },
});

module.exports = SignedUp = mongoose.model("signedUp", signedUpSchema);
