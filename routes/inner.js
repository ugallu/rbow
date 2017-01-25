// import middlewares
var mainRedirectMW = require('../middleware/generic/mainredirect');
var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');

module.exports = function(app){

  var objectRepository = {
    };


app.get("/tables",
        authMW(objectRepository),
        renderMW(objectRepository, 'overview')
);

app.get("/functions",
        authMW(objectRepository),
        renderMW(objectRepository, 'overview')
);

app.get("/addfunction",
        authMW(objectRepository),
        renderMW(objectRepository, 'overview')
);

app.get("/addtable",
        authMW(objectRepository),
        renderMW(objectRepository, 'overview')
);

app.get("/mystuff",
        authMW(objectRepository),
        renderMW(objectRepository, 'overview')
);

app.get("/profile",
        authMW(objectRepository),
        renderMW(objectRepository, 'overview')
);

}
