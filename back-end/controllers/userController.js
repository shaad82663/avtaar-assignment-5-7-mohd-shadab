const User = require('../models/user');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


//Query 1 : Add user
exports.addUser =  catchAsyncErrors (async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(200).json({
        success : true,
        user
    })
})