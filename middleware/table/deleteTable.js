/**
 * Delete a table
 *
 */

 var requireOption = require('../generic/require').requireOption;

  module.exports = function (objectrepository) {

    var tableModel = requireOption(objectrepository, 'tableModel');

    return function (req, res, next) {
      console.log("yy");
      if(typeof res.tpl.table === 'undefined'){
        res.tpl.error.push("Cannot remove function: function with this ID not found");
        return next();
      }
      //lets find the user
      tableModel.remove({
        _id: res.tpl.table._id
      }, function (err, result) {
        //redirect to / so the app can decide where to go next
        return next();
      });
    };

  };
