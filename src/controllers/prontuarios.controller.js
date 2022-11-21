require('dotenv').config();
const Prontuario = require('../models/prontuarios.model');
const User = require('../models/user.model');
const ObjectID = require('mongodb').ObjectID;

const sgMail = require('@sendgrid/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = { 
    prontuarioGet: async (req, res) => {  
        try {
            // const idUser = req.body._id;
            // const prontuarios = await Prontuario.find({ user: {$eq: idUser} });
            const prontuarios = await Prontuario.find().populate(['user']);
            
            res.status(200).json({
                message: 'Consulting prontuarios with successfully!',
                prontuario: prontuarios
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }     
    },
    prontuarioGetId: async (req, res, next) => {
        try {
            const idUser = ({_id: req.params.id});
            const prontuarios = await Prontuario.find({ user: {$eq: idUser} });

            res.status(200).json({
                message: 'Consulting prontuarios with successfully!',
                prontuario: prontuarios
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }         
    },
    prontuarioPost: async (req, res) => { 
        try {
            const chart = await (await Prontuario.create(req.body)).populate(['user']);
            console.log(chart);
         
            res.status(201).json({
                message: 'Create prontuario with successfully!',
                chart: chart
            }); 

            const dados = {
                name: chart.user.userName
            };

            const emailTemplate = fs.readFileSync(path.join(__dirname, "../views/chart.handlebars"), "utf-8");
            const template = handlebars.compile(emailTemplate);

            const messageBody = (template({
                name: `${ dados.name }`    
            }));

            const msg = {
                to: [
                  '' + `${chart.user.userEmail}` + ''
                ], 
                from: '<'+`${process.env.FROM}`+'>',
                subject: 'Prontuário - Life Calendar',
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
    prontuarioPatchId: async (req, res, next) => { 
        // try {
        //     const updateProntuario = await Prontuario.findByIdAndUpdate(req.params.id, {
        //         treatment: req.body.treatment
        //     });
        //     res.status(200).json({ message: 'Prontuario was updated' });
        // } catch (error) {
        //     res.status(400).json({ message: error.message });
        // }  
        // next();
    },
    prontuarioDeleteId: async (req, res, next) => {
        try {
            const prontuario = await Prontuario.deleteOne({ _id: req.params.id });
            if (prontuario !== null) {
                return res.status(200).json({ message: 'Prontuario was deleted' });
            } else {
                return res.status(404).json({ message: 'Prontuario ID does not exist to be deleted' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }  
        next();
    }
}

