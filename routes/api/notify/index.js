/**
 * Created by charbel on 11/5/2015.
 */
///**
// * Created by charbel on 8/22/2015.
// */
var express = require('express');
var router = express.Router();
var controller = require ('./notify.controller');

router.get('/:tempId', controller.sendEmailNotification);

module.exports = router;