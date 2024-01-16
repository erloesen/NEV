const express = require('express');
const router = express.Router();
const userinfoHandler = require('../router_handle/userinfo');
const expressJoi = require('@escook/express-joi');

const { name_limit, email_limit, password_limit, reset_password_limit} = require('../limit/user.js');

// upload avatar
router.post('/uploadAvatar', userinfoHandler.uploadAvatar);
// bind image to account
router.post('/bindAccount', userinfoHandler.bindAccount);
// get user info
router.post('/getUserinfo', userinfoHandler.getUserinfo);
// modify password
router.post('/changePassword', expressJoi(password_limit), userinfoHandler.changePassword);
// modify name
router.post('/changeName', expressJoi(name_limit), userinfoHandler.changeName);
// modify sex
router.post('/changeSex', userinfoHandler.changeSex);
// modify email
router.post('/changeEmail', expressJoi(email_limit), userinfoHandler.changeEmail);
// verify account and email
router.post('/verifyAccountAndEmail', userinfoHandler.verifyAccountAndEmail);
// resetpassword in login
router.post('/resetPassword', expressJoi(reset_password_limit), userinfoHandler.resetPassword)

module.exports = router;