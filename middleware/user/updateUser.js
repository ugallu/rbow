/**
 * Updates an existing user or creates a new one
 *
 */


 var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectRepo){

   var UserModel = requireOption(objectRepo, 'userModel');

   return function (req, res, next){
     //not enough parameter
     if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
       (typeof req.body.password === 'undefined')|| (typeof req.body.password2 === 'undefined')||
       (typeof req.body.name === 'undefined')) {
       res.tpl.error.push('Not enough parameters!');
       return next();
     }

     // all neccessary parameters are present
     // validate them

     //lets find the user
     UserModel.findOne({
       email: req.body.email
     }, function (err, result) {

       if ((err) || (result == null)) {
         res.tpl.error.push('User not found!');
         return next();
       }
       if (req.body.password !== req.body.password2) {
         res.tpl.error.push('Not matching passwords!');
         return next();
       }
       if (req.body.password.length < 5) {
         res.tpl.error.push('Too short password!');
         return next();
       }
       if (req.body.name.length < 4) {
         res.tpl.error.push('Too short name!');
         return next();
       }
       result.name = req.body.name;
       result.email = req.body.email;
       result.password = req.body.password;
       result.save(function (err) {
         //redirect to /login
         req.session.name = req.body.name;
         res.tpl.name  = req.body.name;
         return next();
       });
     });
   };

 };
