const Images = require('../Models/image-details');
const multer = require("multer");
const path = require('path');


const url = 'http://localhost:5000'; 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../photos'));
    },
    filename: function (req, file, cb) {
        const unique = Date.now();
        cb(null, unique + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadfile = async (req, res) => {
    const { base64 } = req.body;
    try {
        const newImage = new Images({ image: base64 });
        await newImage.save();
        const imageUrl = `${url}/file/${base64}`;
        return res.status(200).json({ "imageurl": imageUrl, "imageData": base64 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error uploading file" });
    }
}

module.exports = { upload, uploadfile };
