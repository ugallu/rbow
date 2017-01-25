// import middlewares
var mainRedirectMW = require('../middleware/generic/mainredirect');
var inverseAuthMW = require('../middleware/generic/inverseauth');
var renderMW = require('../middleware/generic/render');

module.exports = function(app){

  var objectRepository = {
  };
// redirect on login to overview
app.get("/",
            mainRedirectMW(objectRepository)
);

app.get("/login",
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'login')
);

app.get("/register",
        inverseAuthMW(objectRepository),
        renderMW(objectRepository, 'register')
);

}
