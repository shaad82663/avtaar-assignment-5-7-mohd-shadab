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

    //Getting all bookings for given item in sorted order of endDate
    const bookings = await Booking.find({id : itemId}).sort({endDate : 1});
    var start = new Date();

    var end = new Date();
    end.setDate(start.getDate() + 6);

    if(bookings.length != 0){  //IF it is not the first booking => checking for slot.
        //TODO: fucntion it 
        //IF user has already book this item.
        if(hasBooked(bookings, bookId)){ //function hasBooked() defined below.
             return next(new ErrorHandler(`User with uid ${uid} has already booked item : ${itemId}`, 404));
        }

       //IF user did not book this item  => find slot for this booking.   
      //getting end date of the last booking. 
      const { endDate } = bookings[bookings.length-1];
      
      start.setDate(endDate.getDate()+1);
      end.setDate(start.getDate()+6);
    }
    req.body.startDate = start;
    req.body.endDate = end;   

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

//Checks if user has already booked the ticket or not.
function hasBooked(bookings, bookId) {
    for(var i = 0; i<bookings.length; i++) {
        const { _id } = bookings[i];
        if(_id === bookId) return true;
      }

      return false;  
}