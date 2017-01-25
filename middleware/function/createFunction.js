/**
 * Update fucntion with the given ID and content
 *
 */

 var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectRepo){

   var functionModel = requireOption(objectRepo, 'functionModel');

   return function (req, res, next){
     //not enough parameter
     if ((typeof req.body === 'undefined') || (typeof req.body.function_name === 'undefined') ||
       (typeof req.body.function_code === 'undefined')) {
       return next();
     }
     // all neccessary parameters are present
     // validate them

     //lets find the function
     functionModel.findOne({
       name: req.body.function_name
     }, function (err, result) {

       if ((err) || (result !== null)) {
         res.tpl.error.push('Already resolved function name. Choose another name');
         return next();
       }
       // here can be validated the code
       //create user
       var newFunction = new functionModel();
       newFunction.name = req.body.function_name;
       newFunction.code = req.body.function_code;
       newFunction.owner = req.session.user_id;
       newFunction.save(function (err) {
         //redirect to /login
         return next();
       });
     });
   };

 };
