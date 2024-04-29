
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
//components
const Connection = require('./Database/Dd.js')
const Router = require('./Routes/route.js')

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',  Router);
// app.use(cors({
//     origin: 'http://localhost:3000'
//   }));
  

const PORT = 5000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));