
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//components
const Connection = require('./Database/Dd.js')
const Router = require('./Routes/route.js')

dotenv.config();

const app = express();

app.use(cors());
app.use('/', Router);


const PORT = process.env.PORT || 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));