var express = require('express');
var app = express();
var port = process.env.PORT || 3000

var session = require('express-session');
app.set('view engine', 'ejs');
// public stuff to /static
 app.use('/static', express.static('public'));

/**
 * Session above all
 */
app.use(session({
  name: '',
  secret: 'keyboard fish',
  cookie: {
    maxAge: 600000
  },
  resave: true,
  saveUninitialized: false
}));

// for post process
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));


/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
  res.tpl = {};
  res.tpl.userModel = [];
  res.tpl.functionModel = [];
  res.tpl.tableModel = [];
  res.tpl.chunkModel = [];
  res.tpl.blockModel = [];
  res.tpl.progresbarModel = [];
  res.tpl.user = {};
  res.tpl.error = [];

  res.tpl.name = req.session.name;
  return next();
});


require('./routes/user')(app);
require('./routes/inner')(app);
require('./routes/outer')(app);
require('./routes/table')(app);
require('./routes/function')(app);

/**
 * Default error handler
 */
app.use(function(err, req, res, next){
  res.status(404).send('These aren\'t the droids you\'re looking for');
  console.error(err.stack);
});

// start it
app.listen(port, function () {
  console.log('RBow started at port ' + port);
});
