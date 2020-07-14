const router = require('express').Router();
const db = require('../models');
const { Op } = require("sequelize");

// Add Patient  
router.post('/addPatient', async (req, res) => {
    const patient = {
        name: req.body.name_a,
        age: req.body.age,
        gender: req.body.gender,
        walletAmount: req.body.walletAmount
    };
    const result = await db.Patients_abhishek.create(patient);
    res.json(result);
});

//Delete Patient
router.delete('/deletePatient',async(req,res)=>{
    try{
        db.Patients_abhishek.destroy({where:{id:req.body.id}});
        res.json(result);

    }   catch(err){
        res.json(err);
    }
});

//get all the patients with walletAmount > x
router.get('/getAllPatientswithwalletclause',async(req,res)=>{
    try{
        const result = await db.Patients_abhishek.findAll({
            where: {
                walletAmount:{
                    [Op.gt]:req.body.walletAmount
                }
            }
        });
        res.json(result);
    }
    catch(err){
        res.json(err)
    }
});

// // update Patient information 
router.post('/updatePatient',async(req,res)=>{
    console.log(req.body.name_a)
    console.log(req.body.id)
    try{
        const result = await db.Patients_abhishek.update({name : req.body.name_a},{ where: {id:req.body.id}});
        res.json(result);
    }
    catch(err){
        res.json(err);
    }
});

// get all the data from the database
router.get('/getall', async (req,res) => {
    try {
        const result = await db.Patients_abhishek.findAll();
        res.json(result);
    }   
    catch(err){
        res.json(err);
    }
   
})

module.exports= router;


