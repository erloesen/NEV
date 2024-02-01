const express = require('express');
const router = express.Router();
const factoryHandler = require('../router_handle/factory');

router.post('/getProCity', factoryHandler.getProCity);
router.post('/getFaclist', factoryHandler.getFaclist);
router.post('/getFacDetail', factoryHandler.getFacDetail);

module.exports = router