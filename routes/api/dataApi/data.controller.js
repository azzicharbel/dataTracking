///**
// * Created by charbel on 9/25/2015.
// */
exports.getSensorData = function (req,res){
    console.log("Get Sensor Data");
    console.log( req.params.id);
    res.json(req.params.id);

    var io = req.app.get('socketio');

    io.sockets.emit('update', req.params.id);

};