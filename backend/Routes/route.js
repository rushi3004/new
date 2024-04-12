const express = require('express');
const mongoose = require('mongoose');

// const { uploadImage } = require('../Controller/image-controller.js');
const { singupUser, loginUser } = require('../Controller/user-controller.js');
const uploads = require('../Controller/image-controller.js')
const multer = require('multer')
require("../Models/image-details.js");
const Images = mongoose.model("ImageDetail");
const router = express.Router();

// const storage = multer.diskStorage({
//     destination: 'backend/photos/',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname); // Use file.originalname to set the filename
//     }
// });

// let uploads = multer({
//     storage:storage
// })
router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/file/upload',uploads.single('image'),async (req,res) => {
    console.log('request', req.body);
    try {
        await Images.create({image:imageName})
        res.json({status:imageName})
    }catch(error){
        res.json({status:error})
    }
    });

module.exports = router;
