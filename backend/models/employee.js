const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const employeeSchema = new mongoose.Schema({
    Image: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
        trim: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /.+\@.+\..+/,
    },
    Mobile: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    Designation: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    Course: {
        type: String,
        required: true,
    },
    CreateDate: {
        type: Date,
        default: Date.now,
    },
});

employeeSchema.plugin(AutoIncrement, { inc_field: 'Id' });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
