const express = require('express');
const router = express.Router();
const passport = require('passport');

const employeeSection = require('../controllers/employeeSection');

router.get('/home',passport.restrictAccessPages, employeeSection.home);
router.post('/update/:id', passport.checkAuthentication, employeeSection.update);
router.get('/delete/:id',employeeSection.delete);
router.get('/makeadmin/:id',employeeSection.makeadmin);
router.get('/removeadmin/:id',employeeSection.removeadmin);



module.exports = router;

