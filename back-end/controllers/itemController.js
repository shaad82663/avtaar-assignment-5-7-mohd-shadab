const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Item = require('../models/item');

//Query 2 : Add Item
exports.addItem =  catchAsyncErrors (async (req, res, next) => {
    const item = await Item.create(req.body);

    res.status(200).json({
        success : true,
        item
    })
})