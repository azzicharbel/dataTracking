/**
 * Created by charbel on 9/25/2015.
 */
module.exports = function(app) {

    // Insert routes below
    app.use('/apis/dataApi', require('./routes/api/dataApi'));  // /apis/dataApi/data


    // All undefined asset or api routes should return a 404
    //app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    //    .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendfile('/index.html');
        });
};

//api/dataApi/