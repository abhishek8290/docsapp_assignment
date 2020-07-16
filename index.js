const express= require('express');
const app = express();
const bodyparser= require('body-parser');
const db = require('./models/index');
const apiRoutes = require('./router/apiRoutes');
const session = require('express-session');
const newroute = require('./router/newroutes');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });


const TWO_HOUR = 2 * 60 * 60 * 1000;
const secret_session =  'secretkitty';

app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(session({
    name : 'Docsapp',
    resave: false,
    saveUninitialized: false,
    secret: secret_session,
    cookie: {
        maxAge: TWO_HOUR,
        sameSite: true,
        secure: false ,
    },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),

}))



db.sequelize.sync().then(() => {
    app.listen('8000',() => {
        console.log('Server is running at port 8000');
    })

})

app.use(bodyparser.json());
app.use('/api',apiRoutes);
app.use('/',newroute)

