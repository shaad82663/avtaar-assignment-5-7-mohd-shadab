const express = require('express');
const router =  express.Router();

const {newBooking, getBooking} = require('../controllers/bookingController.js');

router.route('/booking/new').post(newBooking);
router.route('/booking/').get(getBooking);


module.exports  = router;