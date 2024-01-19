const express = require('express');
const router = express.Router();
const setHandler = require('../router_handle/setting');

// import interface from router_handle
router.post('/uploadSwiper', setHandler.uploadSwiper)
router.post('/getSwipers', setHandler.getSwipers)
router.post('/getCompanyInfo', setHandler.getCompanyInfo)
router.post('/changeCompanyInfo', setHandler.changeCompanyInfo)
router.post('/changeInfo', setHandler.changeInfo)
router.post('/getInfo', setHandler.getInfo)
router.post('/getAllInfo', setHandler.getAllInfo)

module.exports = router;