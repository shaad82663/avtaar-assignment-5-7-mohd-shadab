const Booking = require('../models/booking');
const User = require('../models/user');
const Item = require('../models/item');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

exports.getBooking = catchAsyncErrors (async (req, res, next) => {
    const uid = req.body.uid;
    const id = req.body.id;
    const bookId = uid+id
    const bookings = await Booking.find({});
    
    let booking = {};
    for(var i = 0; i<(await bookings).length; i++) {
        
        const { _id } = bookings[i];
        
        if(_id === bookId){
            booking = bookings[i];
            break;
        }
        
    }

    res.status(200).json({
        success : true,
        booking 
    })
})

//Query 3 : Add booking
/* FUNTION DESCRIPTION: 
takes lists of item ids and user ids as input (post request) and books the item for all users.
It generate errors when : a) IF any uid (from the list) is wrong.
                          b) IF any item id (from the list) is wrong.
                          c) IF user has already booked the item.
NOTE: IF any single entry in the list generates the error, no DB will be created and success will be false in resposnse for all the other booking in the list. 
      The function automatically arranges the slot for the combination of particular uid and item id/ 
*/
exports.newBooking = catchAsyncErrors (async (req, res, next) => { 
    const uidList = req.body.uid;
    const itemIdList =req.body.id;  
    const allBookings = [];
    for(var i = 0; i< uidList.length; i++) {
    let uid = uidList[i];
    let itemId = itemIdList[i];
    bookId = uid + itemId;
    req.body._id = bookId;

    
    //Checking if user exists or not
    const user =  await User.findById(uid);
    if(!user) {
        return next(new ErrorHandler('No user found!', 404));
    }

    //Checking if item exists or not
    const item =  await Item.findById(itemId);
    if(!item) {
        return next(new ErrorHandler('No item found!', 404));
    }

    //IF user has already book this item.
    const hasAlreadyBooked = await Booking.findOne({_id : bookId});
    if(hasAlreadyBooked) {
        return next(new ErrorHandler(`User with uid ${uid} has already booked item : ${itemId}`, 404));
    }

    //Getting the last booking for the given item.
    const lastBooking = await Booking.findOne({id : itemId}).sort({endDate : 1});

    var bookingStartDate = new Date();

    var bookingEndDate = new Date();
    bookingEndDate.setDate(bookingStartDate.getDate() + 6);

    if(lastBooking){  //IF it is not the first booking for given item => checking for slot.

      //getting end date of the last booking. 
      const { endDate } = lastBooking;
      
      bookingStartDate.setDate(endDate.getDate()+1);
      bookingEndDate.setDate(bookingStartDate.getDate()+6);
    }
    req.body.startDate = bookingStartDate;
    req.body.endDate = bookingEndDate;   

    req.body.uid = uid;
    req.body.id = itemId;

    const booking =  await Booking.create(req.body);
    allBookings.push(booking);
}
    res.status(200).json({
        success : true,
        bookings : allBookings
    })

})
