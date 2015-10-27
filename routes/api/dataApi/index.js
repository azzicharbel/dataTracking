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
//{ent
    //res.send(req.params.id);
    //res.render('index', { title:req.params.id});
    //console.log(req.params.id);

//});
//
module.exports = router;