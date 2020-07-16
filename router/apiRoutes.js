const router = require('express').Router();
const db = require('../models');
const { Op } = require("sequelize");

// Add Patient  // working checked 
router.post('/addPatient', async (req, res) => {
    const patient = {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        walletAmount: req.body.walletAmount
    };
    const result = await db.Patients_abhishek.create(patient);
    res.redirect('/api/addPatient');
});

// //Delete Patient
router.post('/deletePatient',async(req,res)=>{
    try{
        db.Patients_abhishek.destroy({where:{id:req.body.id}});
        res.redirect('/api/deletePatient');

    }   catch(err){
        res.json(err);
    }
});

//get all the patients with walletAmount > x // working checked 
router.post('/getAllPatientswithwalletclause',async(req,res)=>{
    try{
        console.log(req.body.walletAmount)
        const result = await db.Patients_abhishek.findAll({
            where: {
                walletAmount:{
                    [Op.gt]:req.body.walletAmount
                }
            }
        });
        console.log(result);
        res.json(result);
    }
    catch(err){
        res.json(err)
    }
});

// // update Patient information example name  // working checked 
router.post('/updatePatient',async(req,res)=>{
    console.log(req.body.name)
    console.log(req.body.id)
    try{
        const result = await db.Patients_abhishek.update({name : req.body.name},{ where: {id:req.body.id}});
        res.redirect('/api/updatePatient');
    }
    catch(err){
        res.json(err);
    }
});
router.get('/updatePatient', (req,res)=>{
    res.send(`
        <h2>Patient name updated </h2>
        <a href ='/home'>Home</a>
    `)
});
router.get('/deletePatient', (req,res)=>{
    res.send(`
        <h2>Patient Deleted</h2>
        <a href ='/home'>Home</a>
    `)
});
router.get('/addPatient', (req,res)=>{
    res.send(`
        <h2>Patient details added</h2>
        <a href ='/home'>Home</a>
    `)
})

// // get all the data from the database
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


