const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const user = require("../../models/User");
const userValidator = require("../../validations/userValidations");
const alumniValidator = require("../../validations/alumniValidations");
const TIQadminValidator = require("../../validations/tiqAdminValidations");
const discipleValidator = require("../../validations/disciplevalidations");
const parentValidator = require("../../validations/parentValidations");


router.get('/search/:keyWord',async(req,res)=>{
  const keyWord=req.params.keyWord
  const userr = await User.find({ "firstName" : { $regex: keyWord, $options: 'i' } } )
  if(userr.length===0) return res.status(404).send({error: 'User with that keyword does not exist'})
  return res.json({data:userr})
       
  })
  


router.put("/Profile/:id",async(req,res)=>{
  try{
  const userId = req.params.id;
  const addedPicture = req.body.profilePicture
  const userToUpdate = await user.findOneAndUpdate({_id:userId},{profilePicture:addedPicture})
  res.json({ data:userToUpdate, msg: "Profile added" });
  } catch (error) {
    console.log("error");
  }
})

router.post("/register/:id", async (req, res) => {
  const id = req.params.id;
  const signedUp = await SignedUp.findOne({ _id: id });
  const t = signedUp.type;

  switch (t) {

    case "disciple":
      try {
           
        const salt = bcrypt.genSaltSync(10);
        const cryptedPasswrod = bcrypt.hashSync(signedUp.password, salt);
        const newUser = new User({
          type:signedUp.type,
          firstName:signedUp.firstName,
          lastName:signedUp.lastName,
          birthDate:signedUp.birthDate,
          bio:signedUp.bio,
          email:signedUp.email,
          password: cryptedPasswrod,
          house:signedUp.house,
          score:signedUp.score,
          din:signedUp.din,
          dor:signedUp.dor,
        });
        await User.create(newUser);

        return res.json({ msg: "User created successfully", data: newUser });
      } catch (error) {
        // We will be handling the error later

        console.log(error);
      }
    case "alumni":
      try {
       
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(signedUp.password, salt);
        const newUser = new User({
          type:signedUp.type,
          firstName:signedUp.firstName,
          lastName:signedUp.lastName,
          birthDate:signedUp.birthDate,
          bio:signedUp.bio,
          email:signedUp.email,
          password: hashedPassword,
          house:signedUp.house,
          score:signedUp.score,
          din:signedUp.din,
          dor:signedUp.dor,
        });
        await User.create(newUser);

        return res.json({ msg: "User created successfully", data: newUser });
      } catch (error) {
        return res.status(422).send({ error: "Can not create user" });
      }
case "member":
      try {
       
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(signedUp.password, salt);
        console.log(6);
        const newMember = new User({
          type:signedUp.type,
          firstName:signedUp.firstName,
          lastName:signedUp.lastName,
          birthDate:signedUp.birthDate,
          bio:signedUp.bio,
          email:signedUp.email,
          password: hashedPassword,
          house:signedUp.house,
          din:signedUp.din,
          dor:signedUp.dor,
          tiqStatus:signedUp.tiqStatus,
          supervisorType:signedUp.supervisorType,
        });

        await User.create(newMember);
        console.log("done");
        // return res.json({ msg: "User created successfully", data: newMember });
      } catch (error) {
        return res.status(422).send({ error: "Can not create user" });
      }
   
    case "parent":
      try {
       
        const salt = bcrypt.genSaltSync(10);
        const cryptedPasswrod = bcrypt.hashSync(signedUp.password, salt);
        const newUser = new User({
          type:signedUp.type,
          firstName:signedUp.firstName,
          lastName:signedUp.lastName,
          birthDate:signedUp.birthDate,
          bio:signedUp.bio,
          email:signedUp.email,
          password: cryptedPasswrod,
         
        });
        await User.create(newUser);
        // return res.json({ msg: "User created successfully", data: newUser });

      } catch (error) {
        // We will be handling the error later

        console.log(error);
      }
      try {
        const deleted= await SignedUp.findByIdAndRemove({ _id: id });
        res.json({ msg: "User was deleted successfully", data: deleted });
      } catch (error) {
        console.log(error);
      }

  }
});

//get all users

router.get("/", async (req, res) => {
  const users = await user.find();
  users.sort((a, b) => (a.score > b.score) ? 1 : -1)
  users.reverse();
  res.json({ data: users });
});


//uppdate scores dynamically
router.put("/updateScores/:id/:score", async (req, res) => {
  const id = req.params.id;
  const addedScore = req.params.score;
  const User = await user.findOneAndUpdate(
    { _id: id },
    { $inc: { score: addedScore } }
  );

  res.json({data:User});
});

//get user by id
router.get("/:id", async (req, res) => {
  try
  {
    const userId = req.params.id;
    const specificUser = await user.findOne({_id:userId})
    res.json({data:specificUser})
  }
  catch(error)
  {
    res.json({msg:"cannot find user"})
  }
});

// updating the info/profile of a user
router.put("/:id", async (req, res) => {
 
    const userId = req.params.id;
    const getuser = await user.findOne({ _id: userId });
    if (!getuser) return res.status(404).send({ error: "User does not exist" });
    t=getuser.type;
    switch(t){
        case "disciple":
        try{
          const isValidated =discipleValidator.updateValidationUser(req.body);
          if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        const updatedUser = await user.findOneAndUpdate({ _id: userId }, req.body);
          res.json({ msg: "User updated sucessfully" });
        }
        catch(error)
        {
            res.json({msg:"cannot find user"})
          }


          case "alumni":
          try{
            const isAlumniValidated=alumniValidator.updateValidationUser(req.body);
            if (isAlumniValidated.error)
          return res
            .status(400)
            .send({ error: isAlumniValidated.error.details[0].message });
        const updatedUser = await user.findOneAndUpdate({ _id: userId }, req.body);
          res.json({ msg: "User updated sucessfully" });
        }
        catch(error)
        {
            res.json({msg:"cannot find user"})
          }
          
          case"member":
          try{
            const isUserValidated=userValidator.updateUserValidation(req.body);

            if (isUserValidated.error)
            return res
              .status(400)
              .send({ error: isUserValidated.error.details[0].message });
          const updatedUser = await user.findOneAndUpdate({ _id: userId }, req.body);
            res.json({ msg: "User updated sucessfully" });
          }
          catch(error)
          {
              res.json({msg:"cannot find user"})
            }

            case"parent":
            try{
              const isParentValidated=parentValidator.updateParentValidationUser(req.body);
  
              if (isParentValidated.error)
              return res
                .status(400)
                .send({ error: isParentValidated.error.details[0].message });
            const updatedUser = await user.findOneAndUpdate({ _id: userId }, req.body);
              res.json({ msg: "User updated sucessfully" });
            }
            catch(error)
            {
                res.json({msg:"cannot find user"})
              }
    }
});

router.put("update/admin/:id",async (req,res)=>{
  const userId = req.params.id;
  const getuser = await user.findOne({ _id: userId });
  if (!getuser) return res.status(404).send({ error: "User does not exist" });
  t=getuser.type;
  switch(t){
    case"disciple":
    try{
      const isDiscipleValidated=discipleValidator.updateValidationAdmin(req.body);

      if (isDiscipleValidated.error)
      return res
        .status(400)
        .send({ error: isDiscipleValidated.error.details[0].message });
    const updatedUser = await user.findOneAndUpdate({ _id: userId }, req.body);
      res.json({ msg: "User updated sucessfully" });
    }
    catch(error)
    {
        res.json({msg:"cannot find user"})
      }

      case"alumni":
      try{
        const isAlumniValidatedAdmin=alumniValidator.updateValidationAdmin(req.body);
  
        if (isAlumniValidatedAdmin.error)
        return res
          .status(400)
          .send({ error: isAlumniValidatedAdmin.error.details[0].message });
      const updatedUser = await user.findOneAndUpdate({ _id: userId }, req.body);
        res.json({ msg: "User updated sucessfully" });
      }
      catch(error)
      {
          res.json({msg:"cannot find user"})
        }

        case"member":
      try{
        const isMemberValidatedAdmin=userValidator.updateValidationAdmin(req.body);
  
        if (isMemberValidatedAdmin.error)
        return res
          .status(400)
          .send({ error: isMemberValidatedAdmin.error.details[0].message });
      const updatedUser = await user.findOneAndUpdate({ _id: userId }, req.body);
        res.json({ msg: "User updated sucessfully" });
      }
      catch(error)
      {
          res.json({msg:"cannot find user"})
        }
  }
})
//delete a user
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteduser = await user.findByIdAndRemove({ _id: userId });
    res.json({ msg: "User was deleted successfully", data: deleteduser });
  } catch (error) {
    console.log(error);
  }
});
router.get("/tiq/BOA", async(req,res)=>{
  try{  
  const BOAs = await user.find({tiqStatus :"BOA"})
  res.json({data:BOAs})
  }
  catch(error){
    res.json("msh 3arfa")
  }
})
router.get("/tiq/PHL",async(req,res)=>{
  try{
    const PHL = await user.find({$and:[{house:"Pegasus"},{tiqStatus:"House Leader"}]})
    res.json({data:PHL})
  }
  catch(error){
    res.json("cannot find them")
  }
})
router.get("/tiq/OHL",async(req,res)=>{
  try{
    const OHL = await user.find({$and:[{house:"Orion"},{tiqStatus:"House Leader"}]})
    res.json({data:OHL})
  }
  catch(error){
    res.json("cannot find them")
  }
})
router.get("/tiq/FS",async(req,res)=>{
    try{
      const FS = await user.find({$and:[{tiqStatus:"Supervisor"},{supervisorType:"Fundraising"}]})
      res.json({data:FS})
    }
    catch(error){
      res.json("cannot find user")
    }
})
router.get("/tiq/MS",async(req,res)=>{
  try{
    const MS = await user.find({$and:[{tiqStatus:"Supervisor"},{supervisorType:"Marketing"}]})
    res.json({data:MS})
  }
  catch(error){
    res.json("cannot find user")
  }
})
router.get("/tiq/LS",async(req,res)=>{
  try{
    const LS = await user.find({$and:[{tiqStatus:"Supervisor"},{supervisorType:"Logistics"}]})
    res.json({data:LS})
  }
  catch(error){
    res.json("cannot find user")
  }
})
router.get("/tiq/RS",async(req,res)=>{
  try{
    const RS = await user.find({$and:[{tiqStatus:"Supervisor"},{supervisorType:"Relations"}]})
    res.json({data:RS})
  }
  catch(error){
    res.json("cannot find user")
  }
})
router.get("/tiq/MDS",async(req,res)=>{
  try{
    const MDS = await user.find({$and:[{tiqStatus:"Supervisor"},{supervisorType:"Media Design"}]})
    res.json({data:MDS})
  }
  catch(error){
    res.json("cannot find user")
  }
})
router.get("/tiq/DHL",async(req,res)=>{
  try{
    const DHL = await user.find({tiqStatus:"Disciples House Leader"})
     res.json({data:DHL})
  }
  catch(error){
    res.json({msg:"cannot find users"})
  }
})
//get user by id
router.get("/:id", async (req, res) => {
  try
  {
    const userId = req.params.id;
    const specificUser = await user.findOne({_id:userId})
    res.json({data:specificUser})
  }
  catch(error)
  {
    res.json({msg:"cannot find user"})
  }
});
// Update a user
router.put("/update/:id", async (req, res) => {
  // try {
  const userId = req.params.id;
  const getuser = await user.findOne({ _id: userId });
  if (!getuser) return res.status(404).send({ error: "user does not exist" });
  const t = getuser.type;
  switch (t) {
    case "alumni":
      try {
        const isAlumniValidated = alumniValidator.updateValidation(req.body);

        if (isAlumniValidated.error)
          return res
            .status(400)
            .send({ error: isAlumniValidated.error.details[0].message });

        const updatedAlumni = await getuser.updateOne(req.body);

        if (!updatedAlumni)
          return res.status(404).send({ error: "user updation has erroe" });
        res.json({ msg: "User updated sucessfully" });
      } catch (error) {
        console.log(error);
      }

    case "member":
      try {
        const isUserValidated = userValidator.updateValidation(req.body);

        if (isUserValidated.error)
          return res
            .status(400)
            .send({ error: isUserValidated.error.details[0].message });

        const updatedMember = await getuser.updateOne(req.body);

        if (!updatedMember)
          return res
            .status(404)
            .send({ error: "member updation has an error" });
        res.json({ msg: "User updated sucessfully" });
      } catch (error) {
        console.log(error);
      }
      case "parent":
      try {
        const isUserValidated = parentValidator.updateValidation(req.body);

        if (isUserValidated.error)
          return res
            .status(400)
            .send({ error: isUserValidated.error.details[0].message });

        const updatedMember = await getuser.updateOne(req.body);

        if (!updatedMember)
          return res
            .status(404)
            .send({ error: "member updation has an error" });
        res.json({ msg: "User updated sucessfully" });
      } catch (error) {
        console.log(error);
      }
      case "TIQadmin":
      try {
        const isUserValidated = TIQadminValidator.TIQadminValidation(req.body);

        if (isUserValidated.error)
          return res
            .status(400)
            .send({ error: isUserValidated.error.details[0].message });

        const updatedMember = await getuser.updateOne(req.body);

        if (!updatedMember)
          return res
            .status(404)
            .send({ error: "member updation has an error" });
        res.json({ msg: "User updated sucessfully" });
      } catch (error) {
        console.log(error);
      }
      case "disciple":
      try {
        const isUserValidated = discipleValidator.updateValidation(req.body);

        if (isUserValidated.error)
          return res
            .status(400)
            .send({ error: isUserValidated.error.details[0].message });

        const updatedMember = await getuser.updateOne(req.body);

        if (!updatedMember)
          return res
            .status(404)
            .send({ error: "member updation has an error" });
        res.json({ msg: "User updated sucessfully" });
      } catch (error) {
        console.log(error);
      }
  }
});
//Authentication
router.post("/authenticate", async (req, res) => {
  let r = {
    token: null,
    id: null,
    usertype: null
  };
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fuser = await user.findOne({ email: email });
    if (fuser && bcrypt.compareSync(password, fuser.password)) {
      r.token = jwt.sign({ sub: fuser._id }, process.env.SECRET);
      r.usertype = fuser.type;
      r.id = fuser._id;
    }
    return res.json(r);
  } catch (error) {
    res.json(r);
  }
});

module.exports = router;