/**
 *  Delete function with the given ID
 *
 */

 var requireOption = require('../generic/require').requireOption;

  module.exports = function (objectrepository) {

    var functionModel = requireOption(objectrepository, 'functionModel');

    return function (req, res, next) {
      console.log("e");
      if(typeof res.tpl.function === 'undefined'){
        res.tpl.error.push("Cannot remove function: function with this ID not found");
        return next();
      }
      //lets find the user
      functionModel.remove({
        _id: res.tpl.function._id
      }, function (err, result) {
        //redirect to / so the app can decide where to go next
        return next();
      });
    };

  };
