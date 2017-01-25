/**
 * Returns with the table
 *
 */
var requireOption = require('../generic/require').requireOption;

module.exports = function (objectrepository) {

 var tableModel = requireOption(objectrepository, 'tableModel');
 var processlistModel = requireOption(objectrepository, 'processlistModel');

 return function (req, res, next){

   //lets find the function
   processlistModel.findOne({
      _id: res.tpl.user._processlist._id
    }).populate('_tables').exec(function (err, result) {
       res.tpl.processlist = result;
       next();
     });
 };

};
