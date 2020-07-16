const router = require('express').Router();
const db = require('../models');

const sess_name =  'Docsapp';

const  redirectLogin = ( req, res, next ) => {
    if(!req.session.userId){
        res.redirect('/login')
    }
    else next();
}
const redirectHome = ( req, res, next ) => {
    if(req.session.userId)res.redirect('/home');
    else next();
}
// front page
router.get('/',(req,res)=>{
    // const userId = req.session;
    res.send( `
    <h1>Welcome !</h1>

    ${  (req.session.userId) ? `
    <a href = '/home'>Home</a>
    <form method = 'post' action ='/logout'>
    <button>Logout</button>
    </form>
    ` : `
    <a href = '/login'>Login</a>
    <a href = '/register'>Register</a>
    `}
    
    
    ` )
});
// get login
router.get('/login',redirectHome,(req,res) => {
    res.send(`
    <h1>Login<h1>
    <form method = 'post' action = '/login'>
        <input type = 'email' name = 'email' placeholder= 'Email' required/>
        <input type = 'password' name = 'password' placeholder= 'Password' required/>
        <input type ='submit'>

    </form>
    <l1><a href = '/register'>Register</a></l1>
    `)
})
//get register
router.get('/register',redirectHome,(req,res) => {
    res.send(`
    <h1>Register<h1>
    <form method = 'post' action = '/register'>
        <input type = 'name' name = 'name' placeholder= 'Name' required/>
        <input type = 'email' name = 'email' placeholder= 'Email' required/>
        <input type = 'password' name = 'password' placeholder= 'Password' required/>
        <input type ='submit'>

    </form>
    `)
})

//home page // 
router.get('/home',redirectLogin,(req,res) => {
    res.send(`
        <h1>Home</h1>
        <a href = '/'>main</a>
        <ul>
            <li><a href = '/addPatient'>Add Patient</a></li>
            <li><a href = '/updatePatient'>Update Patient</a></li>
            <li><a href = '/deletePatient'>Delete Patient</a></li>
            <li><a href = '/getallwalletamountclause'>Get all patient with wallent amount greater than</a></li>
        </ul>
        <form method ='post' action = '/logout'>
            <button>Logout</button>
        </form>
    `)
})
router.get('/addPatient',redirectLogin,(req,res) => {
    res.send(`
    <h1> Add Patient </h1>
    <form method = 'post' action = '/api/addPatient' >
        <input type = 'name' name = 'name' placeholder= 'Name' required/>
        <input type = 'age' name = 'age' placeholder= 'Age' required/>
        <input type = 'gender' name = 'gender' placeholder= 'Gender' required/>
        <input type = 'walletAmount' name = 'walletAmount' placeholder= 'Wallet Amount' required/>
        <input type ='submit'>
    </form>
    `)

});
router.get('/updatePatient',redirectLogin,(req,res) =>{
    res.send(`
    <h1> Update Patient Name </h1>
    <form method ='post' action = '/api/updatePatient'>
        <input type ='id' name ='id', placeholder = 'id' required/>
        <input type = 'name' name ='name' placeholder='Name' required/>
        <input type='submit'>
    </form>
    `)
})

router.get('/deletePatient',redirectLogin ,(req,res) => {
    res.send(`
    <h1>Delete Patient</h1>
    <form method='post' action ='/api/deletePatient'>
        <input type ='id' name ='id' placeholder = 'id' required />
        <input type = 'submit'>
    </form>
    `)
})
router.get('/getallwalletamountclause',redirectLogin ,(req,res) => {
    res.send(`
    <h1>Get All Patients With Wallet Amount Greater Than X </h1>
    <form method='post' action ='/api/getAllPatientswithwalletclause'>
        <input type ='walletAmount' name='walletAmount' placeholder= 'walletAmount' required />
        <input type = 'submit'>
    </form>
    `)
})

//post login
router.post('/login',redirectHome, async( req, res) => {
    const { email, password } = req.body;
    if( email && password ){
        const result = await db.Admin_abhishek.findOne({where:{email:email}});
        if(password === result.dataValues.password)
            req.session.userId = result.dataValues.id;
            return res.redirect('/home');
    }
});
//post register
router.post('/register',redirectHome, async( req, res) => {
    const { name ,email, password } = req.body;
    if( name && email && password ){ //more sophistacatd validation
        const exists = await db.Admin_abhishek.findOne({where:{email:email}});
        if(exists)console.log('Already exists ');
        
        if(!exists){
            const user =  {
                name,
                email,
                password 
            };
            const result = await db.Admin_abhishek.create(user);
            console.log(result.dataValues);
            req.session.userId = result.dataValues.id;
            return res.redirect('/home');
        }
    }
    else res.redirect('/register'); 
});

//post logout
router.post('/logout',redirectLogin,(req,res) => {
    req.session.destroy(err => {
        if(err){
            return res.redirect('/home')
        }
        res.clearCookie(sess_name);
        res.redirect('/login')
    })
})


module.exports= router;