/**
 * Returns with the list of the tables
 *
 */
var requireOption = require('../generic/require').requireOption;
var url = require('url');

 module.exports = function (objectrepository) {
   var functionModel = requireOption(objectrepository, 'functionModel');

   return function (req, res, next){

    var queryData = url.parse(req.url, true).query;
    if (queryData.abc !== undefined) {
      functionModel.find({}).sort('name').exec(function(err, result) {
        res.tpl.functions = result;
        //redirect to /login
        next();
      });
    }
    else if(queryData.latest  !== undefined) {
      functionModel.find({}).sort('-date').exec(function(err, result) {
        res.tpl.functions = result;
        //redirect to /login
        next();
      });
    }
    else{
      //lets find the table
      var querystring = {};
      if(queryData.name  !== undefined) {
          querystring = ({name: {$regex: queryData.name, $options: 'i'}});
      }

      functionModel.find(querystring, function (err, result) {
          res.tpl.functions = result;
          //redirect to /login
          next();
        });
    }
   };
 };
