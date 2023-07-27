const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home')
const passport = require('passport');

router.get('/', passport.checkAuthentication, homeController.home);
router.post('/completeReview',passport.checkAuthentication,homeController.completeReview);

router.use('/users', require('./users'));
router.use('/review',require('./review'))
router.use('/employee',require('./employeeSection'))

module.exports = router;