///**
// * Created by charbel on 9/25/2015
// */
var DbSensorData = require ('../../../ModelDb/dbSchema');

exports.getSensorData = function (req,res){
    var sensorData = req.params.id;
    var dateReceived = new Date();
    console.log("Sensor Data = ");
    console.log(sensorData);

    console.log("Data date received = ");
    console.log(dateReceived);

    res.json(sensorData);

    var newData = new DbSensorData ({
        status : sensorData,
        dateReceived : dateReceived
    })

    newData.save(function (err){
       if (err)
           console.log("There was a problem adding the information to the database.")
        console.log("Data was saved succesffuly in dataTracking");
    });

    // Set our internal DB variable
    //var db = req.db;

    //insert data into database dataTracking, to the collection sensorData
    //db.sensorData.insert({
    //    "status": sensorData,
    //    "dateReceived": dateReceived
    //}, function (err, doc) {
    //    if (err) {
    //        // If it failed, return error
    //        //res.send("There was a problem adding the information to the database.");
    //        console.log("There was a problem adding the information to the database.")
    //    }
    //    else {
    //        // And forward to success page
    //        //res.send("Date save succesffuly");
    //        console.log("Data was saved succesffuly in dataTracking");
    //    }
    //});

    //////call the controller with the updated data
    var io = req.app.get('socketio');
    io.sockets.emit('update', sensorData);

};