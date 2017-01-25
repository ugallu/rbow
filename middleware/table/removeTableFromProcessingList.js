/**
 * Remove table from the processing list
 *
 */

 module.exports = function (objectRepo){

   return function (req, res, next){
     console.log(res.tpl.user);
     var processlist = res.tpl.user._processlist;
     var index = processlist._tables.indexOf(res.tpl.table._id);
     if(index > -1){
       processlist._tables.splice(index, 1);
       processlist.save(function (err) {
         return next();
       });
     }
   };
 };
