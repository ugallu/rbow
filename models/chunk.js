var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Chunk = db.model('Chunk', {
  name: String,
  size: {
    type: Number,
    default: 0
  },

  _table: {
    type: Schema.Types.ObjectId,
    ref: 'Table'
  }
});

module.exports = Chunk;
