const express  = require('express');
const router = express.Router();

const {addItem} = require('../controllers/itemController');

router.route("/item/new").post(addItem);    

module.exports = router;
