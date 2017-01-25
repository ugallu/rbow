/**
 * This module validates user parameters like correct email and password length
 * registers new user if email is not reserved
 *
 */

var requireOption = require('../generic/require').requireOption;

module.exports = function (objectRepo){

  var UserModel = requireOption(objectRepo, 'userModel');

  return function (req, res, next){
    //not enough parameter
    if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
      (typeof req.body.password === 'undefined')|| (typeof req.body.password2 === 'undefined')||
      (typeof req.body.name === 'undefined')) {
      return next();
    }

    // all neccessary parameters are present
    // validate them

    //lets find the user
    UserModel.findOne({
      email: req.body.email
    }, function (err, result) {

      if ((err) || (result !== null)) {
        res.tpl.error.push('Your email address is already registered!');
        return next();
      }
      if (req.body.password !== req.body.password2) {
        res.tpl.error.push('Not matching passwords!');
        return next();
      }
      if (req.body.password.length < 5) {
        res.tpl.error.push('Too short password!');
        return next();
      }
      if (req.body.name.length < 4) {
        res.tpl.error.push('Too short name!');
        return next();
      }

      //create user
      var newUser = new UserModel();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser._processlist = res.tpl.processlist._id;
      newUser.save(function (err) {
        //redirect to /login
        return next();
      });
    });
  };

};
