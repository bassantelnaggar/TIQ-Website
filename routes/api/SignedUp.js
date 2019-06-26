
const express = require('express')
const router = express.Router()
router.use(express.json())
const mongoose = require('mongoose')
const SignedUp = require('../../models/SignedUp')
const alumniValidator = require("../../validations/alumniValidations");
const discipleValidator = require("../../validations/disciplevalidations");
const parentValidator = require("../../validations/parentValidations");
const bcrypt = require("bcryptjs");
const user = require("../../models/User");

const userValidator = require("../../validations/userValidations");


router.post("/signUp", async (req, res) => {
  const Email = req.body.email;

  const signnew = await SignedUp.findOne({ email: Email });
  const usernew = await user.findOne({ email: Email });

  if (usernew || signnew)
    return res
      .status(400)
      .json({ email: "Email already exists ,choose another mail..." });

  const t = req.body.type;
console.log(t)
  switch (t) {
     
      case "disciple":
        try {
          const isValidated = discipleValidator.registerValidation(req.body);
          if (isValidated.error)
            return res
              .status(400)
              .send({ error: isValidated.error.details[0].message });
          const {
            firstName,
            lastName,
            birthDate,
            email,
            password,
            type,
            house,
            bio,
            
            //profilePicture
          } = req.body;
          const salt = bcrypt.genSaltSync(10);
          const cryptedPasswrod = bcrypt.hashSync(password, salt);
          const signedUp = new SignedUp({
            type,
            firstName,
            lastName,
            birthDate,
            bio,
            email,
            password: cryptedPasswrod,
            //profilePicture,            
            house
           
  
          });
          await SignedUp.create(signedUp);
  
          return res.json({ data: signedUp });
        } catch (error) {
          // We will be handling the error later
  
          console.log(error);
        }
      case "alumni":
        try{
          const isValidated = alumniValidator.registerValidation(req.body);
          if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
          const firstName=  req.body.firstName
          const lastName= req.body.lastName
          const birthDate=req.body.birthDate
          const email= req.body.email
          const password= req.body.password
          const type=req.body.type
          const house=req.body.house
          const din=req.body.din
          const dor=req.body.dor
          const bio=req.body.bio
            //profilePicture
          
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);
         const signedUp= await SignedUp.create({firstName,lastName,birthDate,email,"password":hashedPassword,type,house,din,dor,bio});
  
          return res.json({ data: signedUp });
        }
        catch (error) {
          return res.status(422).send({ error: "Can not create user" });
        }
        
  case "member":
      //  try {
         const isUserValidated = userValidator.registerValidation(req.body);
        if (isUserValidated.error)
          return res
            .status(400)
            .send({ error: isUserValidated.error.details[0].message });
          console.log(5);
          const {
            firstName,
            lastName,
            birthDate,
            clubs,
            email,
            password,
            type,
            house,
            din,
            dor,
            bio,
            tiqStatus,
            supervisorType,
            //profilePicture
          } = req.body;
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);
          console.log(6);
          const signedUp = new SignedUp({
            type,
            firstName,
            lastName,
            birthDate,
            bio,
            email,
            password: hashedPassword,
            house,
            din,
            dor,
            clubs,
            tiqStatus,
            supervisorType,
            //profilePicture
          });
  
          await SignedUp.create(signedUp);
          console.log("done");
          return res.json({data: signedUp });
        // } catch (error) {
        //   return res.status(422).send({ error: "Can not create user" });
        // }
    
      case "parent":
        try {
          const isValidated = parentValidator.registerParentValidation(req.body);
          if (isValidated.error)
            return res
              .status(400)
              .send({ error: isValidated.error.details[0].message });
          const {
            firstName,
            lastName,
            birthDate,
            email,
            password,
            type,
            bio,
            //profilePicture
          } = req.body;
          const salt = bcrypt.genSaltSync(10);
          const cryptedPasswrod = bcrypt.hashSync(password, salt);
          const signedUp = new SignedUp({
            type,
            firstName,
            lastName,
            birthDate,
            bio,
            email,
            password: cryptedPasswrod,
           
          });
          await SignedUp.create(signedUp);
  
          return res.json({ data: signedUp });
        } catch (error) {
          // We will be handling the error later
  
          console.log(error);
        }
    }
  });
  

router.get('/', async(request, response) => {
    const signedUp = await SignedUp.find()
    response.json({data: signedUp})

});

router.get('/:id', async(request, response) => {
    const id = request.params.id

    const signedUp = await SignedUp.find({_id:id})
    response.json({data: signedUp})

});


 router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const deletedSignUp = await SignedUp.findByIdAndRemove(id)
        res.json({ data: deletedSignUp})

       }
       catch(error) {
           console.log(error)
       }   
    })

module.exports = router


