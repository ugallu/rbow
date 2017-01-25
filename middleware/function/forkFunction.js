/**
* Fork a function - copy to currenty user
*
*/
var requireOption = require('../generic/require').requireOption;

module.exports = function (objectRepo){

  var functionModel = requireOption(objectRepo, 'functionModel');

  return function (req, res, next){

    console.log(req.body);

    var newFunction = new functionModel();
    newFunction.name = req.body.name;
    newFunction.code =   res.tpl.function.code;
    newFunction.owner = req.session.user_id;
    newFunction.save(function (err) {
      //redirect to /login
      return next();
    });
  };

};
