var expect = require('chai').expect;
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
describe('user login middleware ', function () {
  it('should halt caused of unsufficent parameters', function (done) {
    var req = {url:""}; var res = { tpl: {error:[]} };
    var fakeUserModel = { find: function (some, cb) {
        cb(undefined, [])
      } };
    checkUserLoginMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error).to.eql(['Not enough parameters!']);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should halt caused of not found user', function (done) {
    var req = {url:"", body:{email:"test@test.com", password:"password11111", password2:"password2222", name:"name"}}; var res = { tpl: {error:[]} };
    var fakeUserModel = {
      findOne: function (some, cb) {
          cb(undefined, null)
        }
    };
    checkUserLoginMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error).to.eql(['Your email address is not registered!']);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should halt caused of unmatched password', function (done) {
    var req = {url:"", body:{email:"test@test.com", password:"password", password2:"password", name:"name"}}; var res = { tpl: {error:[]} };
    var fakeUserModel = {
      findOne: function (some, cb) {
          cb(undefined, {name:"name", _id:"123", email:"test@test.com", password:"realpasswd"})
        }
    };
    checkUserLoginMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error).to.eql(['Wrong password!']);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should login successfully', function (done) {
    var req = {url:"", session:{}, body:{email:"test@test.com", password:"password", password2:"password", name:"name"}}; var res = { redirect: function(a){done();}, tpl: {error:[]} };
    var fakeUserModel = {
      findOne: function (some, cb) {
          cb(undefined, {name:"name", _id:"123", email:"test@test.com", password:"password", save:function(a){ return a();}})
        }
    };
    checkUserLoginMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.name).to.eql("name");
      expect(res.session.userid).to.eql("123");
      expect(req.session.name).to.eql("name");
      expect(err).to.eql(undefined);
      done();
    });
  });


});
