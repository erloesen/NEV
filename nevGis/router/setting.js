const express = require('express');
const router = express.Router();
const setHandler = require('../router_handle/setting');

// import interface from router_handle
router.post('/uploadSwiper', setHandler.uploadSwiper)

module.exports = router;