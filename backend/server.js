const express =  require('express');
const app = express();
const userRoutes = require('./routes/user.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const shopRoutes = require('./routes/shop.routes.js');

const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const corsOptions = {
    origin: ['http://localhost:5173', 'http://10.100.102.46:5173'],
    credentials: true // 
  };

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', shopRoutes)


console.log('Connected to database:', mongoose.Connection.name);



app.get('/', (req, res)=> {
    res.send('Hello Yoni Etedgi How are you thank you')
})


app.listen(process.env.PORT, console.log(`server is running ${process.env.PORT}`));