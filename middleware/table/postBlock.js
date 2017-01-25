/**
 * Return with the table's block
 *
 */

 var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectrepository) {

  var blockModel = requireOption(objectrepository, 'blockModel');

  return function (req, res, next){
    // RECURSIVE LOOP
    var blockObj = res.tpl.block;
    blockObj.result = req.body.result;
    blockObj.state = 2; // done
    blockObj.save();
    res.tpl.user.points = res.tpl.user.points + 1;
    res.tpl.user.save();
    return next();
  };
 };
