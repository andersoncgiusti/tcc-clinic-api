const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
    scheduleTitle: {
        type: String,
        required: false
    },
    scheduleStartTime: {
        type: Date,
        required: true
    },
    scheduleEndTime: {
        type: Date,
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

module.exports = mongoose.model('Agendamento', agendamentoSchema)