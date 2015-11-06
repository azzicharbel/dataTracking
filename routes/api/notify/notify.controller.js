/**
 * Created by charbel on 11/5/2015.
 */
var nodemailer = require('nodemailer');
exports.sendEmailNotification = function(req,res){
    console.log("email notification sent");
    console.log(req.params.tempId);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'datatrackingapp@gmail.com', // Your email id
            pass: 'ca123456' // Your password
        }
    });

    var text = 'Hello, \n\n' + "There has been a suspicious activity, please check your sensor. \n\n" + "Thanks for using our Data Tracking System" ;

    var mailOptions = {
        from: '<datatrackingapp@gmail.com>', // sender address
        to: 'azzicharbel@gmail.com', // list of receivers
        subject: 'Motion Detected', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ?</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({email: 'error'});
            return error;
        }else{
            console.log('Message sent: ' + info.response);
            res.json({email: info.response});
            return info;
        };
    });
}