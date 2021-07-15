var express = require('express');
var path = require('path');
var cors = require('cors');

var hypertargetRouter = require('./routes/hypertarget');

var mysqlPool = require('./config/mysqlConnection');

global.logger = require('./config/log');

var app = express();
app.use(cors());


const port = 5122;
const service = 'Hypertarget Service';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/hypertarget', hypertargetRouter);

app.use(express.static(__dirname + '/public'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
   logger.error('Inside \'resource not found\' handler , Req resource: ' + requestedUrl);

    return res.sendStatus(404);
});


// error handler
app.use(function(err, req, res, next) {

  logger.error('Error handler:', err);
    res.sendStatus(500);
});

app.listen(port, ()=>{
  logger.info(service + ' started on port ' + port);
});

module.exports = app;
