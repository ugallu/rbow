/**
 * Return with the table's block
 *
 */

 var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectrepository) {

  var chunkModel = requireOption(objectrepository, 'chunkModel');
  var blockModel = requireOption(objectrepository, 'blockModel');

  var findChunk = function(chunkArray, index, req, res, next){
    var arrayC = chunkArray;
    if(index > arrayC.length){
      next();
      return;
    }

    blockModel.findOne({
       _chunk: chunkArray[index],
       state: {$lt: 1 },
     }, function (err, result) {
        if(err || result == undefined){
          findChunk(chunkArray, ++index, req, res, next);
        }
        else{
          // set to inprogress
          result.state = 1;
          res.tpl.block = result;
          result.save();
          return next();
        }
      });
  };

  return function (req, res, next){
    // RECURSIVE LOOP
    findChunk(res.tpl.chunks, 0, req, res, next);
  };

 };
