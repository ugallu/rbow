var Schema = require('mongoose').Schema;
var db = require('../config/db');


var User = db.model('User', {
  name: String,
  email: String,
  password: String,
  points: {
    type: Number,
    default: 0
  },
  _processlist: {
    type: Schema.Types.ObjectId,
    ref: 'Processlist'
  }
});

module.exports = User;
