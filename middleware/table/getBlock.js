/**
 * Returns with the table
 *
 */


var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectrepository) {

   var blockModel = requireOption(objectrepository, 'blockModel');

   return function (req, res, next, id){
     //lets find the function
     blockModel.findOne({
        _id: id
      }, function (err, result) {
         res.tpl.block = result;
         next();
       });
   };

 };
