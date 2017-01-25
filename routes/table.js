/**
 * Crud and more advanced management for tables and chunks
 *
 */
var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var createTableMW = require('../middleware/table/createTable');
var getTablesMW = require('../middleware/table/getTables');
var getTableMW = require('../middleware/table/getTable');
var getChunkMW= require('../middleware/table/getChunk');
var getFreeBlockMW = require('../middleware/table/getFreeBlock');
var getBlockMW = require('../middleware/table/getBlock');
var postBlockMW = require('../middleware/table/postBlock');
var deleteTableMW = require('../middleware/table/deleteTable');
var addTableToProcessingListMW = require('../middleware/table/addTableToProcessingList');
var removeTableFromProcessingListMW = require('../middleware/table/removeTableFromProcessingList');

var getUserMW = require('../middleware/user/getUser');
var getUserFunctionsMW = require('../middleware/function/getUserFunctions');

// models+}
var functionModel = require('../models/function');
var tableModel = require('../models/table');
var chunkModel = require('../models/chunk');
var blockModel = require('../models/block');
var processlistModel = require('../models/processlist');
var userModel = require('../models/user');

module.exports = function(app){

  var objectRepository = {
    tableModel2: [
          {'id':123, 'name':'T-MD5', 'owner':'Gergo', 'size': '54', 'status':'993/1000',
            'function':{'id':'3', 'name':'MD5', 'content':'console.log("MD5!")'},
            'chunks':[{'id':'99', 'name':'0', 'status': '121/122',
              'cells':[
                      {'input':'1', 'solution':'', 'status':'inprogress'},
                      {'input':'2', 'solution':'', 'status':'unsolved'},
                      {'input':'3', 'solution':'', 'status':'inprogress'},
                      {'input':'4', 'solution':'', 'status':'inprogress'},
                      {'input':'5', 'solution':'42', 'status':'done'},
                      {'input':'6', 'solution':'43', 'status':'done'},
                      ],
              'inprogress':'33',
              'done':'44',
              'total':'97'

          },{'id':'98', 'name':'1', 'status': '12/122'}]
          },
          {'id':124, 'name':'T-MD6', 'owner':'Gergo', 'size': '994', 'status':'397/4120'},
          {'id':125, 'name':'T-MD7', 'owner':'Gergo', 'size': '157', 'status':'43/1400'},
          {'id':126, 'name':'T-MD8', 'owner':'Gergo', 'size': '154', 'status':'13/1100'},
          {'id':127, 'name':'T-MD9', 'owner':'Gergo', 'size': '54', 'status':'66/1600'},
          {'id':128, 'name':'T-SHA1', 'owner':'Gergo', 'size': '4424', 'status':'33/100'},
          {'id':129, 'name':'T-SHA2', 'owner':'Gergo', 'size': '5', 'status':'3/10'}
      ],
      functionModel: [
            {'id':23, 'name':'MD5', 'size': '54', 'rec':'10/10'},
            {'id':24, 'name':'MD6', 'size': '1024', 'rec':'0/10'},
            {'id':25, 'name':'SHA1', 'size': '512', 'rec':'0/10'},
        ],
    };

    var objectRepository = {
      tableModel: tableModel,
      chunkModel: chunkModel,
      blockModel: blockModel,
      functionModel: functionModel,
      userModel: userModel,
      processlistModel: processlistModel,
  };

app.param('tableID',
      getTableMW(objectRepository)
);

app.param('chunkID',
      getChunkMW(objectRepository)
);

app.param('blockID',
      getBlockMW(objectRepository)
);

app.get("/content/addtable",
    authMW(objectRepository),
    function (req, res, next) {
      res.tpl.function_owner = req.session.user_id;
      next();
    },
    getUserFunctionsMW(objectRepository),
    renderMW(objectRepository, 'content/addtable')
);
// create a new table with given function
app.post("/table",
    authMW(objectRepository),
    createTableMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/tables');
    }
);

// get list of tables
app.get("/content/tables",
        authMW(objectRepository),
        getTablesMW(objectRepository),
        renderMW(objectRepository, 'content/tables')
);

// get detailed view of a table
app.get("/content/table/:tableID",
    authMW(objectRepository),
    renderMW(objectRepository, 'content/table')
);

// get chunk of a table
app.get("/table/:tableID/:chunkID",
    authMW(objectRepository),
    renderMW(objectRepository, 'chunk')
);


// get block of a table, no redirection
app.get("/block/:tableID",
    authMW(objectRepository),
    getUserMW(objectRepository),
    getTableMW(objectRepository),
    getFreeBlockMW(objectRepository),
    function (req, res, next) {
    res.json(res.tpl);
    }
);

app.get("/content/chunk/:chunkID",
        authMW(objectRepository),
        renderMW(objectRepository, 'content/chunk')
);

// post a result of a block to the table, no redirection
app.post("/block/:blockID",
    authMW(objectRepository),
    getUserMW(objectRepository),
    getBlockMW(objectRepository),
    postBlockMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/tables');
    }
);


// delete a table
app.post("/table/:tableID/delete",
    authMW(objectRepository),
    deleteTableMW(objectRepository),
    renderMW(objectRepository, 'overview')
);

// add to processing list
app.post("/table/:tableID/addToList",
    authMW(objectRepository),
    getUserMW(objectRepository),
    addTableToProcessingListMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/tables');
    }
);

// removeFrom processing list
app.post("/table/:tableID/removeFromList",
    authMW(objectRepository),
    getUserMW(objectRepository),
    removeTableFromProcessingListMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/tables');
    }
);
}
