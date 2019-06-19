
const express = require('express')
const router = express.Router()
router.use(express.json())
const mongoose = require('mongoose')
const validator = require('../../validations/disciplesProgramValidations')
// We will be connecting using database 
const DisciplesProgram = require('../../models/DisciplesProgram')



router.post('/',async (req, res) => {
    try {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const title = req.body.title
        const description = req.body.description
        const year=req.body.year
        const duration=req.body.duration
        const price=req.body.price
        const location=req.body.location
        const image =req.body.image
        const link=req.body.link
        const newDisciplesProgram = await DisciplesProgram.create({
            title: title,
            description: description,
            year:year,
            duration:duration,
            price:price,
            location:location,
            image:image,
            link:link
        })
        res.json({msg:'Disciples Program was created successfully', data: newDisciplesProgram})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }  
   
   
})

router.get('/', async(request, response) => {
    const disciplesProgram = await DisciplesProgram.find()
    response.json({data: disciplesProgram})

});
router.get('/:id', async(request, response) => {
    const id = request.params.id

    const disciplesProgram = await DisciplesProgram.find({_id:id})
    response.json({data: disciplesProgram})

});


 router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const deletedDisciplesProgram = await DisciplesProgram.findByIdAndRemove(id)
        res.json({msg:'Disciples Program was deleted successfully', data: deletedDisciplesProgram})

       }
       catch(error) {
           // We will be handling the error later
           console.log(error)

       }  
   


   
})

router.put('/edit/:id',async (req, res) => {
    try {
        const id = req.params.id
        const disciplesProgram = await DisciplesProgram.findOne({_id:id})
        if(!disciplesProgram) return res.status(404).send({error: 'Disciples Program does not exist'})
        const isValidated = validator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedDisciplesProgram = await disciplesProgram.updateOne(req.body)
        res.json({msg: 'Disciples Program updated successfully', data: updatedDisciplesProgram})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }  
    
})


module.exports = router


