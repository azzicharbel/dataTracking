///**
// * Created by charbel on 8/22/2015.
// */
var express = require('express');
var router = express.Router();
var controller = require ('./data.controller');
//
///* GET home page. */
router.get('/:id', controller.getSensorData);
router.get('/', controller.getLastDataEntry);
module.exports = router;