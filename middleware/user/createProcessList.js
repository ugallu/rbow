/**
* Creates a process list for the user.
* used in user resistration
*
*/

var requireOption = require('../generic/require').requireOption;

module.exports = function (objectRepo){

  var processlistModel = requireOption(objectRepo, 'processlistModel');

  return function (req, res, next){

      var newProcesslist = new processlistModel();
      newProcesslist._tables = [];
      newProcesslist.save(function (err, result) {
        //redirect to /login
        res.tpl.processlist = result;
        return next();
      });
    };

};
