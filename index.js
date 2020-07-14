const express= require('express');
const app = express();
const bodyparser= require('body-parser');
const db = require('./models/index');
const apiRoutess = require('./router/apiRoutes')


app.use(bodyparser.urlencoded({
    extended:true
}));

db.sequelize.sync().then(() => {
    app.listen('8000',() => {
        console.log('Server is running at port 8000');
    })

})

app.use(bodyparser.json());
app.use('/api',apiRoutess);

app.get('/',(req,res)=>res.send('hello world'));

// app.listen('8000',function(){console.log('app started')});