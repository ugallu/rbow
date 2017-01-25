/**
 * Returns with the users tables
 *
 */

 var requireOption = require('../generic/require').requireOption;

  module.exports = function (objectrepository) {
    var tableModel = requireOption(objectrepository, 'tableModel');

    return function (req, res, next){

      //lets find the function
      tableModel.find({
        _owner: res.tpl.function_owner
      }, function (err, result) {
          res.tpl.tables = result;
          //redirect to /login
          next();
        });
    };

  };
