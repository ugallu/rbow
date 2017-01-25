/**
 * Delete the current user
 *
 */

var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectrepository) {

   var userModel = requireOption(objectrepository, 'userModel');

   return function (req, res, next) {

     //lets find the user
     userModel.remove({
       _id: req.session.userid
     }, function (err, result) {
       //redirect to / so the app can decide where to go next
       res.tpl.name = "";
       return next();
     });
   };

 };
