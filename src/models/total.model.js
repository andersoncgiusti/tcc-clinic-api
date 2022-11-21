const mongoose = require('mongoose')

const totalSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Total', totalSchema)