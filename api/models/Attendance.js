const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    img: {
        type: String,
        required: true
    },  
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);