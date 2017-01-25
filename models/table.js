var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Table = db.model('Table', {
  name: String,
  size: {
    type: Number,
    default: 0
  },
  
  date: { type: Date, default: Date.now },

  _function: {
    type: Schema.Types.ObjectId,
    ref: 'Function'
  },

  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Table;
