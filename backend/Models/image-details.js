const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {
        type: String
    },
}, { timestamps: true });

const Images = mongoose.model('Images', imageSchema);

module.exports = Images;
