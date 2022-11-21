// const mongoose = require('mongoose')

// const projectSchema = new mongoose.Schema({
//     userName: {
//         type: String,
//         required: true
//     },
//     userLastName: {
//         type: String,
//         required: true
//     },
//     userBirth: {
//         type: String,
//         required: true
//     },
//     userPhone: {
//         type: String,
//         required: true
//     },
//     userEmail: {
//         type: String,
//         required: true
//     },
//     userCpf: {
//         type: String,
//         required: true
//     },
//     userAddress: {
//         type: String,
//         required: true
//     },
//     userNumber: {
//         type: String,
//         required: true
//     },
//     userComplement: {
//         type: String,
//         required: true
//     },
//     userCity: {
//         type: String,
//         required: true
//     },
//     userState: {
//         type: String,
//         required: true
//     },
//     userPermission: {
//         type: String,
//         required: true
//     },
//     tasks: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Task',
//         require: true
//     }],
//     created: {
//         type: Date,
//         required: true,
//         default: Date.now
//     }
// })

// module.exports = mongoose.model('Project', projectSchema)