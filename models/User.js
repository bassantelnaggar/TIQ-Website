const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const userSchema = new Schema({
  type: {
    type: String,
    required: true,
    enumm: ["disciple", "member", "parent", "TIQamin", "alumni"]
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
    type: String,
    enum: ["Pegasus", "Orion", "Neutral"]
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

  tiqStatus: {
    type: String,
    enum: ["House Leader", "BOA", "Supervisor", "Disciples House Leader", ""]
  },
  supervisorType: {
    type: String,
    enum: ["Marketing", "Fundraising", "Logistics", "Relations", "Media Design"]
  },
  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dpny1nhaq/image/upload/v1560854813/default_profile_fpwmcd.png"
  },

  resetPasswordToken: String, // used for after password reset is submitted
  resetPasswordExpires: Date
});

module.exports = User = mongoose.model("users", userSchema);
