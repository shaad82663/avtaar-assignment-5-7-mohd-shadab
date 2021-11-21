const express = require('express');
const router = express.Router();


const {addUser} = require('../controllers/userController');

router.route("/user/new").post(addUser);

module.exports= router;