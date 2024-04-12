const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
   image:String
  },
  {
    collection: "ImageDetail",
  }
);

mongoose.model("ImageDetail", ImageDetailsScehma);