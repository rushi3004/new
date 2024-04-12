

const dotenv = require('dotenv');

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const multer = require('multer')

const mongourl = `mongodb+srv://${username}:${password}@cluster0.07chum3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'../backend/photos');
    },
    filename: function(req,file,cb){
        console.log(file);
        const unique = Date.now();
        cb(null,unique+file.originalname)
    }
})

const uploads = multer({storage:storage})

module.exports = uploads;


