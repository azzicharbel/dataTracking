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

    if (sensorData=="HHHHHHHHHHHHHHHH" || sensorData=="LLLLLLLLLLLLLLLL") {
        var newData = new DbSensorData({
            status: sensorData,
            dateReceived: dateReceived
        })

        newData.save(function (err) {
            if (err)
                console.log("There was a problem adding the information to the database.")
            console.log("Data was saved succesffuly in dataTracking");
        });

        //////call the controller with the updated data
        var io = req.app.get('socketio');
        io.sockets.emit('update', sensorData);
    }
    else {
        console.log("Invalid data and cannot be added to the database");
    }

};