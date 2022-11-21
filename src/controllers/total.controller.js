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
    totalGet: async (req, res) => {
        try {          
            const total = await Total.find(req.body).populate(['user']); 

            res.status(201).json({
                message: 'Consuting total with successfully!',
                total: total
            });             
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    totalPost: async (req, res) => {  
        try {                     
            const session = await Session.find(ObjectId(req.body.user));

            let sessionId = 0;
            for (const cashsId of session) {
                sessionId += eval(cashsId.sessionPatient);
            }

            const total = ({
                user: req.body.user,
                sessionPatient: sessionId
            })            
            console.log(total);
            
            await Total.updateOne({ user: req.body.user }, total)
            .then(result => {
                console.log(result);
                res.status(200).json({ 
                    message: 'Total session contabilized with successfully!',
                    result: result 
                })
            }); 
           
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    totalPut: async (req, res) => {  
        try {         
            // const session = await Session.find(ObjectId(req.body.user));
            // const qte = parseInt(req.body.sessionPatient);     
            // let sessionId = 0;
            // for (const cashsId of session) {
            //     sessionId += eval(cashsId.sessionPatient);
            // }
            // const finalized = sessionId - qte;
            // const calc = finalized - qte;
            // const total = ({
            //     user: req.body.user,
            //     sessionPatient: calc
            // })    

            const session = await Total.find(ObjectId(req.body.user)).populate(['user']); 
            const user = await User.findOne({_id: req.body.user}); 
            
            const qte = parseInt(req.body.sessionPatient);
            
            let sessionId = 0;
            for (const cashsId of session) {
                sessionId += eval(cashsId.sessionPatient);
            }
          
            const finalized = sessionId - qte;            

            const total = ({  
                user: req.body.user,
                sessionPatient: finalized.toString() 
            })    
              
            await Total.updateOne({ user: req.body.user }, total)
            .then(result => {
                res.status(200).json({ 
                    message: 'Total session contabilized with successfully!',
                    result: result 
                })
            }); 

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
           
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    totalForPut: async (req, res) => {  
        try {         
            const session = await Session.find(ObjectId(req.body.user));
            console.log(session);
            // let sessionId = 0;
            // for (const cashsId of session) {
            //     sessionId += eval(cashsId.sessionPatient);
            // }
            
            // const total = new Total({
            //     user: req.body.user,
            //     sessionPatient: sessionId
            // })
            // console.log(total);
            // await Total.updateOne({ user: req.body.user, }, total)
            // .then(result => {
            //     res.status(200).json({ 
            //         message: 'Total session contabilized with successfully!',
            //         result: result 
            //     })
            // }); 
           
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
}