var express = require('express');
var app = express();
var port = process.env.PORT || 3000

// static stuff to root
app.use('/', express.static('static'));

// start it
app.listen(port, function () {
  console.log('RBow started at port ' + port);
});
