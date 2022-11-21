const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        // unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
    // passwordResetToken: {
    //     type: String,
    //     select: false
    // },
    // passwordResetExpires: {
    //     type: Date,
    //     select: false
    // },
    // userDate: {
    //     type: Date,
    //     required: true,
    //     default: Date.now
    // }
})

module.exports = mongoose.model("Auth", authSchema)