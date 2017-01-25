/**
 * This module creates a new table with inputs and function
 *
 */

 var requireOption = require('../generic/require').requireOption;

 module.exports = function (objectRepo){

   var tableModel = requireOption(objectRepo, 'tableModel');
   var chunkModel = requireOption(objectRepo, 'chunkModel');
   var blockModel = requireOption(objectRepo, 'blockModel');
   var functionModel = requireOption(objectRepo, 'functionModel');

   return function (req, res, next){
     //not enough parameter
     if ((typeof req.body === 'undefined') || (typeof req.body.table_name === 'undefined') ||
       (typeof req.body.table_inputs === 'undefined') || (typeof req.body.table_function_id === 'undefined')) {
       return next();
     }
     // all neccessary parameters are present
     // validate them
     //lets find the function
     functionModel.findOne({
       _id: req.body.table_function_id
     }, function (err, result) {

       if ((err) || (result == null)) {
         res.tpl.error.push('Given function not found. Please select another one.');
         return next();
       }

       var inputs = JSON.parse(JSON.stringify(req.body.table_inputs));
       // here can be validated the code
       //create user
       var newTable = new tableModel();
       newTable.name = req.body.table_name;
       console.log(result._id);
       newTable._function = result._id;
       newTable._owner = req.session.user_id;
       newTable.save(function (err) {
         var chunkSize = 10;
         var chunkNumber = Math.floor((inputs.length)/chunkSize);
         for(var i=0; i<chunkNumber; i++){
           var chunkStartInput = inputs[i*chunkSize];
           var blockNum = chunkSize;
           if(i<chunkNumber-1){
             blockNum = ((inputs.length)%chunkSize)
           }
           createChunk(newTable._id, blockNum, chunkSize * i,inputs, chunkStartInput);
         }
         next();
       });
     });
   };
   function createChunk(tableID, blockNumber, startNum, input, label){
     var newChunk = new chunkModel();
     newChunk._table = tableID;
     newChunk.name = label;
     newChunk.save(function (err) {
       for(var j=0; j<blockNumber; j++){
              createBlock(newChunk._id, startNum + j, input[startNum + j]);
         }
       });
   }

   function createBlock(chunkID, number, parameters){
     var newBlock = new blockModel();
     newBlock._chunk = chunkID;
     newBlock.number = number;
     newBlock.result = "";
     newBlock.parameters = parameters;
     newBlock.save(function (err) {});
   }

 };
