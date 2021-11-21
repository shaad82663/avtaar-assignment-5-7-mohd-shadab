const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please Enter User Name'],
        trime : true,
        maxlength : [100, 'User name can not exceed 100 characters.']
    },
    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : true,
        validate : [validator.isEmail, "Please enter valid email address."]
      },
})


module.exports = mongoose.model('User', userSchema);