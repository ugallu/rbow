/**
 * This module gets an user with an ID.
 * if ID not provided, returns with the logged in user
 *
 */
var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectrepository) {

   var userModel = requireOption(objectrepository, 'userModel');

   return function (req, res, next){

     //lets find the user
     userModel.findOne({
        _id: req.session.userid
     }).populate('_processlist').exec(function (err, result) {

         res.tpl.user = result;
         //redirect to /login
         return next();
       });
   };

 };
