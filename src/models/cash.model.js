const mongoose = require('mongoose')

const cashSchema = new mongoose.Schema({
    sessions: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    pay: {
        type: String,
        required: true
    },    
    total: {
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

module.exports = mongoose.model('Cash', cashSchema)