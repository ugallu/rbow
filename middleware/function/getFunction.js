/**
 * Get fuction with the given ID
 *
 */

 var requireOption = require('../generic/require').requireOption;

  module.exports = function (objectrepository) {

    var functionModel = requireOption(objectrepository, 'functionModel');

    return function (req, res, next, id){
      //lets find the function
      functionModel.findOne({
         _id: id
      }, function (err, result) {

          res.tpl.function = result;
          //redirect to /login
          return next();
        });

      return next();
    };

  };
