/**
 * Get the list of the users functions
 *
 */
 var requireOption = require('../generic/require').requireOption;

  module.exports = function (objectrepository) {
    var functionModel = requireOption(objectrepository, 'functionModel');

    return function (req, res, next){

      //lets find the function
      functionModel.find({
        _owner: res.tpl.function_owner
      }, function (err, result) {
          res.tpl.functions = result;
          //redirect to /login
          next();
        });
    };

  };
