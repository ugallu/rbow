/**
 * Add the given table to the users process list
 *
 */

module.exports = function (objectRepo){

  return function (req, res, next){
    var processlist = res.tpl.user._processlist;
    console.log(processlist._tables.indexOf(res.tpl.table._id));
    if(processlist._tables.indexOf(res.tpl.table._id) == -1){
      processlist._tables.push(res.tpl.table._id);
      processlist.save(function (err) {
        return next();
      });
    }
  };
};
