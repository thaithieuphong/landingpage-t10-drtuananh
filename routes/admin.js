const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');

//END SERVICE NOTE
router.post('/', HomeController.postCustomer);
router.get('/', HomeController.getHome);


module.exports = router;