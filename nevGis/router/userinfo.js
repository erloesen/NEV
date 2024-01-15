const express = require('express');
const router = express.Router();
const userinfoHandler = require('../router_handle/userinfo');
const expressJoi = require('@escook/express-joi');

// upload avatar
router.post('/uploadAvatar', userinfoHandler.uploadAvatar);
// bind image to account
router.post('/bindAccount', userinfoHandler.bindAccount);
// get user info
router.post('/getUserinfo', userinfoHandler.getUserinfo);
// modify name
router.post('/changeName', userinfoHandler.changeName);
// modify sex
router.post('/changeSex', userinfoHandler.changeSex);
// modify email
router.post('/changeEmail', userinfoHandler.changeEmail);



module.exports = router;