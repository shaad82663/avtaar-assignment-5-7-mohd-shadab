const mongoose = require('mongoose');
const validator = require('validator');

const itemSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please Enter Item Name'],
        trime : true
    },
    uid : {
        type : mongoose.Schema.Types.ObjectId, 
        required : true,
        ref : 'User'
    }
})

module.exports = mongoose.model('Item', itemSchema);