const Images = require('../Models/image-details');
const multer = require("multer");

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

const uploadfile = async (req, res) => {
    console.log(req.body);
    const {base64} = req.body
    try {
        await Images.create({ image: base64 }); // Saving name and picture to MongoDB
        const imageUrl = `${url}/file/${base64}`;
        return res.status(200).json({"imageurl":imageUrl,"imageData":base64});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error uploading file" });
    }
}

const upload = multer({ storage: storage });

module.exports = {upload,uploadfile};