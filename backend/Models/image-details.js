const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
 
  {
  image:String
  },
  {
    collection: "uploadImage",
  }
);

mongoose.model("uploadImage", ImageDetailsScehma);