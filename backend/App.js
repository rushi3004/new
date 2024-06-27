
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
const Connection = require('./Database/Dd.js')
const Router = require('./Routes/route.js')
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',  Router);

const PORT = 3000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME

Connection(username, password,dbname);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));