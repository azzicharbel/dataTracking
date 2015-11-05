/**
 * Created by charbel on 11/5/2015.
 */
exports.sendEmailNotification = function(req,res){
    console.log("email notification sent");
    console.log(req.params.tempId);
    res.send(req.params.tempId);
    return req.params.tempId;
}