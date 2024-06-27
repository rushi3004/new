const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User.js');

 const forgot_password = (req, res) => {
        const {email} = req.body;
        User.findOne({email: email})
        .then(user => {
            if(!user) {
                return res.send({Status: "User not existed"})
            } 
            const token = jwt.sign({id: user._id}, process.env.ACCESS_SECRET_KEY, {expiresIn: "1d"})
            console.log("token",token);
            
            var transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "730a76782e6d80",
                  pass: "12b08c743785b2"
                }
              });
              
              var mailOptions = {
                from: 'rushipatel@gmail.com',
                to: req.body.email,
                subject: 'Reset Password Link',
                text: `http://localhost:3000/reset_password/${user._id}/${token}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  return res.send({Status: "Success"})
                }
              });
        })
    }

    module.exports = {forgot_password};