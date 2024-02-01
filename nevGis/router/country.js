const express = require('express');
const router = express.Router();
const countryHandler = require('../router_handle/country');

router.post('/getCountryIndex', countryHandler.getCountryIndex);
router.post('/getCountryPop', countryHandler.getCountryPop);
// 通用
router.post('/getCountryRawIndex', countryHandler.getCountryRawIndex);

module.exports = router