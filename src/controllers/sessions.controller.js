require('dotenv').config();
const Session = require('../models/sessions.model');
const Total = require('../models/total.model');
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

const sgMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    sessionPost: async (req, res) => {
        try {          
            const session = await (await Session.create(req.body)).populate(['user']); 
          
            res.status(201).json({
                message: 'Create session with successfully!',
                session: session
            });             
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    sessionPostTotal: async (req, res) => {
        try {         
            
            const session = ({
                user: req.body.user,
                sessionPatient: 0
            });

            const total = await (await Total.create(session)).populate(['user']); 
      
            res.status(201).json({
                message: 'Create session with successfully!',
                total: total
            });             
            
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    sessionGet: async (req, res) => {
        try {          
            const session = await Session.find().populate(['user']);  

            // const delete_zero = await Session.deleteMany({sessionPatient: {$eq: '0'}}).populate(['user']);  
            // console.log(delete_zero);

            res.status(201).json({
                message: 'Consulting session patient with successfully!',
                session: session
            });             
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },
    sessionDelete: async (req, res, next) => {
        try {
            const session = await Session.findById({ _id: req.params.id }).populate('user');
            const userId = session.user._id;
            const sum = eval(session.sessionPatient + '-' +  session.sessionPatient);

            const total = ({
                sessionPatient: sum
            })

            await Session.updateOne({ user: userId }, total)
            .then(() => {
                res.status(200).json({ 
                    message: 'Session count with successfully!'
                })  
            }); 

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }  
        next();
    },
    sessionPut: async (req, res, next) => {     

        try {
            const userId = req.body.user;            
            const user = await User.findById({ _id: userId });
            // const session = await Session.find({ user: {$eq: user._id} }).populate('user');
            const session = await Session.findOne({ user: {$eq: ObjectId(user._id)} }); 

            const qte = req.body.sessionPatient;               
            const finalized = eval(session.sessionPatient + '+' +  qte);                
              
            const total = ({                
                user: req.body.user,
                sessionPatient: finalized
            }) 
         
            await Session.updateOne({ user: req.body.user }, total)
            .then(() => {
                res.status(200).json({ 
                    message: 'Session count with successfully!'
                })  
            }); 
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }  
        next();
    },
    totalPut: async (req, res, next) => {  
        try {     
            const userId = req.body.user;            
            const user = await User.findById({ _id: userId });
            // const session = await Session.find({ user: {$eq: user._id} }).populate('user');
            const session = await Session.findOne({ user: {$eq: ObjectId(user._id)} }); 

            const qte = req.body.sessionPatient;               
            const finalized = eval(session.sessionPatient + '-' +  qte);                
              
            const total = ({                
                user: req.body.user,
                sessionPatient: finalized
            }) 
            
            await Session.updateOne({ user: req.body.user }, total)
            .then(() => {
                res.status(200).json({ 
                    message: 'Total session contabilized with successfully!'
                })
            }); 

            setTimeout(() => {   

                const dados = {
                    name: user.userName
                }
    
                const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/finish.handlebars"), "utf-8");
                const template = handlebars.compile(emailTemplate);

                const messageBody = (template({
                    name: `${ dados.name }`        
                }))

                const msg = {
                    to: [
                    '' + `${user.userEmail}` + ''
                    ], 
                    from: '<'+`${process.env.FROM}`+'>',
                    subject: 'Sessão finalizada - Life Calendar',
                    html: messageBody 
                };
            
              sgMail
                .send(msg)
                .then(() => {
                  console.log('Email successfully sent');
                }, error => {
                  console.error(error);  
                  if (error.response) {
                    console.error(error.response.body);
                  }
                });  
            }, 2000);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
        next();
    },
}
