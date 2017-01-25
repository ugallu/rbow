/**
 * Returns with the table
 *
 */


  var requireOption = require('../generic/require').requireOption;

   module.exports = function (objectrepository) {

     var tableModel = requireOption(objectrepository, 'tableModel');
     var chunkModel = requireOption(objectrepository, 'chunkModel');

     return function (req, res, next, id){
       //lets find the function
       tableModel.findOne({
          _id: id
        }).populate('_function').exec(function (err, result) {
           res.tpl.table = result;
           chunkModel.find({
             _table: id
           }, function (err, result) {
               res.tpl.chunks = result;
               //redirect to /login
                return next();
             });
         });
     };

   };
