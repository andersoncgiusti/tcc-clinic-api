const User = require('../models/user.model');
// const Auth = require('../models/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
 
generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = { 
    register: (req, res) => {  
        try {
            bcrypt.hash(req.body.password, 10).then(hash => {
                const user = ({
                    password: hash
                })
                user.save().then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    })
                })
            })
            
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

        // try {
        //     const user = await User.create(req.body);
        //     return res.send({ user });            
        // } catch (error) {
        //     return res.status(400).json({ message: "Registration failed!" });
        // }
    },
    authenticate: (req, res) => {
        let fetchedUser
        User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        fetchedUser = user
        return bcrypt.compare(req.body.password, user.password)
      })
      .then(result => {   
        if (!result) {
          return res.status(401).json({ message: "Auth failed" })
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser.id }, 'secret_this_should_be_longer',
          { expiresIn: "1h" }
        )
        res.status(200).json({ token: token, expiresIn: 3600, userId: fetchedUser.id })
      })
      .catch(err => {
        return res.status(401).json({ message: "Invalid authentication credentials!" })
      })
    },
    forgot: async (req, res) => {
        const { userEmail } = req.body;

        try {
            const user = await User.findOne({ userEmail })
            // console.log(user);
            if (!user) {
                return res.status(400).send({ message: 'User not found' })
            }

            const token = crypto.randomBytes(20).toString('hex')
            // console.log(token);
            const now = new Date()
            now.setDate(now.getHours() + 1)

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })

            // console.log(token, now);

            // mailer.sendMail({
            //     to: userEmail,
            //     from: 'anderson_cg12@hotmail.com',
            //     template: 'auth/forgot_password',
            //     context: { token }
            // }, (err) => {
            //     if (err) {
            //         return res.status(400).send({ message: 'Cannot send forgot password email' })
            //     }
            
            //     return res.send()
            // })
        } catch (err) {
            res.status(400).send({ message: 'Error on forgot password, try again' })
        }
    },
    reset: async (req, res) => {
        const { userEmail, token, userPassword } = req.body
        console.log(userEmail, token, userPassword);
        
        try {
            const user = await User.findOne({ userEmail }).select('+passwordResetToken passwordResetExpires')
            console.log(user);
            if (token !== user.passwordResetToken) {
                return res.status(400).send({ message: 'Token invalid' })
            }
            
            const now = new Date()

            if (now > user.passwordResetExpires) {
                return res.status(400).send({ message: 'Token expired, generate a new one' })
            }

            user.userPassword = userPassword

            await user.save()

            res.send()
        } catch (error) {
            res.status(400).send({ message: 'Error on forgot password, try again' })
        }
    }
}
