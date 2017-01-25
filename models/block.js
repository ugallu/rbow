var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Block = db.model('Block', {
  number: String,
  parameters: String,
  result: String,
  state: {
    type: Number,
    default: 0
  },
  _chunk: {
    type: Schema.Types.ObjectId,
    ref: 'Chunk'
  }
});

module.exports = Block;
