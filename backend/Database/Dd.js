const mongoose = require('mongoose');

const Connection = async (username, password,dbname) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.07chum3.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL,{useNewUrlParser: true})
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

module.exports = Connection;