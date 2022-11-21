const mongoose = require('mongoose')

const sessionsSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false,
        uppercase: true
    },
    sessionPatient: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Session', sessionsSchema)