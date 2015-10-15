/**
 * Created by charbel on 10/6/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://127.0.0.1:27017/dataTrackingDb');

var sensorSchema = new Schema({
    "status": String,
    "dateReceived" : Date
})

var dbSensorData = mongoose.model('SensorData', sensorSchema);

module.exports = dbSensorData;