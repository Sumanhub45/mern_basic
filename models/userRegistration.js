const mongoose = require('mongoose');
const validator = require('validator');


// create a schema
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minlength: 3
    },
    lname: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// We will create a new collection
const User = new mongoose.model('User', userSchema);


// to export this module
module.exports = User;


