const mongoose = require('mongoose');
const validator = require('validator');


const bookingSchema = mongoose.Schema({
    _id : {
        type : String,
        required : true
        //Add length 
    },
    uid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Item'
    },
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    }
})

module.exports = mongoose.model('Booking', bookingSchema);