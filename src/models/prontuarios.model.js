const mongoose = require('mongoose')

const prontuarioSchema = new mongoose.Schema({
    treatment: {
        type: String,
        required: false ///true
    },  
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },  
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     require: true
    // },    
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
})


module.exports = mongoose.model('Prontuario', prontuarioSchema)