const express = require('express');
const router = express.Router();
const userinfoHandler = require('../router_handle/userinfo');
const expressJoi = require('@escook/express-joi');

const { name_limit, email_limit, password_limit, reset_password_limit, modify_by_admin_limit, fullcolumns_limit} = require('../limit/user.js');

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
// user control
router.post('/createSuperUser', expressJoi(fullcolumns_limit), userinfoHandler.createSuperUser)
router.post('/getSuperUserList', userinfoHandler.getSuperUserList)
router.post('/modifySuperUser', expressJoi(modify_by_admin_limit), userinfoHandler.modifySuperUser)
router.post('/SuperUser2User', userinfoHandler.SuperUser2User)
router.post('/User2SuperUser', userinfoHandler.User2SuperUser)
router.post('/searchUser', userinfoHandler.searchUser)
router.post('/freezeUser', userinfoHandler.freezeUser)
router.post('/thawUser', userinfoHandler.thawUser)
router.post('/getAbnormalUser', userinfoHandler.getAbnormalUser)
router.post('/deleteUser', userinfoHandler.deleteUser)


module.exports = router;