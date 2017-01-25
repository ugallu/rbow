/**
 * Crud and more advanced management for functions
 *
 */

var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

var updateFunctionMW = require('../middleware/function/updateFunction');
var createFunctionMW = require('../middleware/function/createFunction');
var forkFunctionMW = require('../middleware/function/forkFunction');
var getFunctionMW = require('../middleware/function/getFunction');
var getFunctionsMW = require('../middleware/function/getFunctions');
var deleteFunctionMW = require('../middleware/function/deleteFunction');

var getUserMW = require('../middleware/user/getUser');

// models
var functionModel = require('../models/function');
var userModel = require('../models/user');

module.exports = function(app){

  var objectRepository = {
      functionModel: functionModel,
      userModel: userModel,
    };

  var objectRepository2 = {
      functionModel: [
        {'id':23, 'name':'MD5', 'size': '54', 'rec':'10/10'},
        {'id':24, 'name':'MD6', 'size': '1024', 'rec':'0/10'},
        {'id':25, 'name':'SHA1', 'size': '512', 'rec':'0/10'},
    ],
    };

app.get("/content/addfunction",
            authMW(objectRepository),
            renderMW(objectRepository, 'content/addfunction')
);

// create a new function
app.post("/function",
    authMW(objectRepository),
    createFunctionMW(objectRepository),
    function (req, res, next) {
      res.redirect('/functions');
    }
);

app.param('functionID',
    getFunctionMW(objectRepository)
);

// modify an existing function if have permission
app.post("/function/:functionID",
    authMW(objectRepository),
    updateFunctionMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/');
    }
);

// fork an existing function
app.post("/function/:functionID/fork",
    authMW(objectRepository),
    getUserMW(objectRepository),
    forkFunctionMW(objectRepository),
    function (req, res, next) {
    res.json({});
    }
);

// get detailed information about a function
app.get("/function/:functionID",
    authMW(objectRepository),
    getUserMW(objectRepository),
    getFunctionMW(objectRepository)
);

// delete a function
app.post("/function/:functionID/delete",
    authMW(objectRepository),
    deleteFunctionMW(objectRepository),
    renderMW(objectRepository, 'overview')
);

// get the users functions
app.get("/user/functions",
    authMW(objectRepository),
    getUserMW(objectRepository),
    getFunctionsMW(objectRepository),
    renderMW(objectRepository, 'functionlist')
);

// get functions list
app.get("/content/functions",
    authMW(objectRepository),
    getFunctionsMW(objectRepository),
    renderMW(objectRepository, 'content/functions')
);


}
