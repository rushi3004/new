const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Token = require('../Models/token.js');
const User = require('../Models/User.js');
const nodemailer = require('nodemailer')

dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: "rushipatel8603@gmail.com",
//         pass: "Rushipatel@8603"
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "730a76782e6d80",
      pass: "12b08c743785b2"
    }
  });

const singupUser = async (request, response) => {
    console.log(request.body);
    try {
        const saltround = 10
        const salt = await bcrypt.genSalt(saltround);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const newUser = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword
        });

        await newUser.save();

        const mailOption = {
            from:process.env.EMAILID,
            to: request.body.email,
            subject:"Here is Your Username and Password",
            text: `Username : ${request.body.username} and Password : ${request.body.password}`
        }

        transporter.sendMail(mailOption,(error,info)=> {
            if(error){
                console.error("Error while sending email",error.message);
            }else{
                console.log("Successfully sending your details",info.response);
            }
            
        })

        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        console.log("signup",error);
        return response.status(500).json({ msg: 'Error while signing up user' });
    }
}


const loginUser = async (request, response) => {
    console.log('requestbody',request.body);

    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '1d'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFREASH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken,name: user.name, username: user.username });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        console.log('error in sign in',error);
        response.status(500).json({ msg: 'error while login the user' })
    }
}

 const logoutUser = async (request, response) => {
    const token = request.body.token;
    await Token.deleteOne({ token: token });

    response.status(204).json({ msg: 'logout successfull' });
}

module.exports ={ singupUser,loginUser,logoutUser};
