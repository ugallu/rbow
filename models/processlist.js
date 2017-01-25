var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Processlist = db.model('Processlist', {
  size: {
    type: Number,
    default: 0
  },

  _tables: [{
      type: Schema.Types.ObjectId,
      ref: 'Table'
    }]

});

module.exports = Processlist;
