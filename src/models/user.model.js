const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        uppercase: true
    },
    userLastName: {
        type: String,
        required: true,
        uppercase: true
    },
    userBirth: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    userCpf: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: false,
        uppercase: true
    },
    userNumber: {
        type: String,
        required: false,
        uppercase: true
    },
    userComplement: {
        type: String,
        required: false,
        uppercase: true
    },
    userCity: {
        type: String,
        required: false,
        uppercase: true
    },
    userState: {
        type: String,
        required: false,
        uppercase: true
    },
    userPermission: {
        type: String,
        required: true
    },
    password: { 
        type: String, 
        required: false,
        // select: false
    },
    passwordResetToken: {
        type: String,
        select: false,
        // required: false 
    },
    passwordResetExpires: {
        type: Date,
        select: false,
        // required: false 
    },
    prontuarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prontuario',
        require: true
    }],
    cashs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cash',
        require: true
    }],
    agendamentos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agendamento',
        require: true
    }],
    sessions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        require: true
    },
    totals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Total',
        require: true
    }],
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)