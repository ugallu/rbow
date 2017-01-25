var Schema = require('mongoose').Schema;
var db = require('../config/db');


var Function = db.model('Function', {
  name: String,
  code: String,
  upvote: {
    type: Number,
    default: 0
  },
  
  date: { type: Date, default: Date.now },

  downvote: {
    type: Number,
    default: 0
  },
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Function;
