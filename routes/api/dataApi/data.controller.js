///**
// * Created by charbel on 9/25/2015
// */
var DbSensorData = require ('../../../ModelDb/dbSchema');

exports.getSensorData = function (req,res){
    var sensorData = req.params.id;
    var dateReceived = new Date();
    var saveData ='unknown';

    console.log("Sensor Data = ");
    console.log(sensorData);
    console.log("Data date received = ");
    console.log(dateReceived);

    res.json(sensorData);

    if (sensorData=="HHHHHHHHHHHHHHHH" || sensorData=="LLLLLLLLLLLLLLLL") {

        if (sensorData=="HHHHHHHHHHHHHHHH") {
            saveData = "ON";
            console.log(saveData);
        }
        else{
            saveData="OFF";
            console.log(saveData);
        }
        var newData = new DbSensorData({
            status: saveData,
            dateReceived: dateReceived
        })

        newData.save(function (err) {
            if (err)
                console.log("There was a problem adding the information to the database.")
            console.log(saveData + " Data was saved succesffuly in dataTracking");
        });

        //////call the controller with the updated data
        var io = req.app.get('socketio');
        io.sockets.emit('update', {status :saveData, date: dateReceived});
        console.log("-------socket emit------");
    }
    else {
        console.log("Invalid data and cannot be added to the database");
    }
};

exports.getLastDataEntry = function(req,res){
    //get the latest data entry
    console.log('-----getLastDataEntry()-----');
    DbSensorData.find().sort( { _id : -1 } ).limit(1).exec(function(err, data){
        console.log("get last data" + data);
        res.json(data);
        return data;
    });
    //DbSensorData.find().skip(DbSensorData.count()).exec(function(err, datas){
    //    console.log("get last data" + datas);
    //});
    //if (story.lines.length &&
    //    story.lines[story.lines.length-1].user === socket.username) {
    //    // error, same user is trying to enter another line
    //}
};

