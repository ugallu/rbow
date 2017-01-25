/**
 * This routing supports user management - like CRUD operations
 * and login, logout
 */

// import middlewares
var authMW = require('../middleware/generic/auth');
var inverseAuthMW = require('../middleware/generic/inverseauth');
var renderMW = require('../middleware/generic/render');

var getUserMW = require('../middleware/user/getUser');
var updateUserMW = require('../middleware/user/updateUser');
var checkUserParametersMW = require('../middleware/user/checkUserParameters');
var deleteUserMW = require('../middleware/user/deleteUser');

var logoutUserMW = require('../middleware/user/logoutUser');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var getProcessListMW = require('../middleware/user/getProcessList');

var createProcessListMW = require('../middleware/user/createProcessList');

var getUserFunctionsMW = require('../middleware/function/getUserFunctions');
var getUserTablesMW = require('../middleware/table/getUserTables');
var getProcessListTablesMW = require('../middleware/table/getProcessListTables');

// models
var functionModel = require('../models/function');
var processlistModel = require('../models/processlist');
var userModel = require('../models/user');
var tableModel = require('../models/table');

module.exports = function(app){

  var objectRepository2 = {
    tableModel: [
          {'id':123, 'name':'T-MD5', 'owner':'Gergo', 'size': '54', 'status':'993/1000'},
          {'id':124, 'name':'T-MD6', 'owner':'Gergo', 'size': '994', 'status':'397/4120'}
        ],
    functionModel: [
          {'id':23, 'name':'MD5', 'size': '54', 'rec':'10/10'},
          {'id':24, 'name':'MD6', 'size': '1024', 'rec':'0/10'},
          {'id':25, 'name':'SHA1', 'size': '512', 'rec':'0/10'},
      ],
      userModel: [],
      user: {
        'id':'100',
        'name':'Gergo',
        'email':'olah.istvan.gergely@gmail.com',
        'points':'31',
        'tableNumber':'4',
        'functionNumber':'3',
        'tableCells':'17456',
      }
    };

    var objectRepository = {
      tableModel: tableModel,
      functionModel: functionModel,
      userModel: userModel,
      processlistModel: processlistModel,
      user: {
          'id':'100',
          'name':'Gergo',
          'email':'olah.istvan.gergely@gmail.com',
          'points':'31',
          'tableNumber':'4',
          'functionNumber':'3',
          'tableCells':'17456',
        }
      };


// login - redirects if already logged in
app.post("/login",
    inverseAuthMW(objectRepository),
    checkUserLoginMW(objectRepository),
    renderMW(objectRepository, 'login')
);

// simple logout, redirects if logged out already
app.post("/logout",
    authMW(objectRepository),
    logoutUserMW(objectRepository),
    function (req, res, next) {
      return res.redirect('/');
    }
);

// register a new user
// error handling needed
app.post("/user",
            inverseAuthMW(objectRepository),
            createProcessListMW(objectRepository),
            checkUserParametersMW(objectRepository),
            renderMW(objectRepository, 'register')
);

app.get("/content/mystuff",
        authMW(objectRepository),
        function (req, res, next) {
          res.tpl.function_owner = req.session.user_id;
          next();
        },
        getUserTablesMW(objectRepository),
        getUserFunctionsMW(objectRepository),
        renderMW(objectRepository, 'content/mystuff')
);
// returns with the logged in users profile page
app.get("/user/profile",
            authMW(objectRepository),
            getUserMW(objectRepository),
            renderMW(objectRepository, 'profile')
);


app.get("/content/profile",
        authMW(objectRepository),
        getUserMW(objectRepository),
        renderMW(objectRepository, 'content/profile')
);

// update current users profile
app.post("/user/profile",
            authMW(objectRepository),
            updateUserMW(objectRepository),
            function (req, res, next) {
              return res.redirect('/');
            }
);

// user delete. needs redirect
// use post instead of delete to support html 4 verion forms and auto redirection
app.post("/user/delete",
            authMW(objectRepository),
            deleteUserMW(objectRepository),
            logoutUserMW(objectRepository),
            function (req, res, next) {
              return res.redirect('/');
            }
);

// called by ajax - contains table IDs
app.get("/user/processlist",
            authMW(objectRepository),
            getUserMW(objectRepository),
            getProcessListTablesMW(objectRepository),
            function (req, res, next) {
            res.json(res.tpl);
}
);
}
