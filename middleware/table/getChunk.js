/**
 * Returns with the tables chunk
 *
 */

 var requireOption = require('../generic/require').requireOption;

  module.exports = function (objectrepository) {

    var blockModel = requireOption(objectrepository, 'blockModel');
    var chunkModel = requireOption(objectrepository, 'chunkModel');

    return function (req, res, next, id){
      //lets find the function
      chunkModel.findOne({
         _id: id
       }, function (err, result) {
          res.tpl.chunk = result;
          blockModel.find({
            _chunk: id
          }, function (err, result) {
              res.tpl.blocks = result;
              //redirect to /login
               return next();
            });
        });
    };

  };
