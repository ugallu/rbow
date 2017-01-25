var expect = require('chai').expect;
var updateUserMW = require('../middleware/user/updateUser');
describe('updateUser middleware ', function () {
  it('should halt caused of unsufficent parameters', function (done) {
    var req = {url:""}; var res = { tpl: {error:[]} };
    var fakeUserModel = { find: function (some, cb) {
        cb(undefined, [])
      } };
    updateUserMW({
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
    updateUserMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error).to.eql(["User not found!"]);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should halt caused of unmatched password', function (done) {
    var req = {url:"", body:{email:"test@test.com", password:"password11111", password2:"password2222", name:"name"}}; var res = { tpl: {error:[]} };
    var fakeUserModel = {
      findOne: function (some, cb) {
          cb(undefined, {name:"name", _id:"123", email:"test@test.com", password:"passwd"})
        }
    };
    updateUserMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error).to.eql(["Not matching passwords!"]);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should halt caused of short password', function (done) {
    var req = {url:"", body:{email:"test@test.com", password:"p", password2:"p", name:"name"}}; var res = { tpl: {error:[]} };
    var fakeUserModel = {
      findOne: function (some, cb) {
          cb(undefined, {name:"name", _id:"123", email:"test@test.com", password:"passwd"})
        }
    };
    updateUserMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error).to.eql(["Too short password!"]);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should halt caused of short name', function (done) {
    var req = {url:"", body:{email:"test@test.com", password:"password", password2:"password", name:"n"}}; var res = { tpl: {error:[]} };
    var fakeUserModel = {
      findOne: function (some, cb) {
          cb(undefined, {name:"name", _id:"123", email:"test@test.com", password:"passwd"})
        }
    };
    updateUserMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.error).to.eql(["Too short name!"]);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it('should save', function (done) {
    var req = {url:"", session:{}, body:{email:"test@test.com", password:"password", password2:"password", name:"name"}}; var res = { tpl: {error:[]} };
    var fakeUserModel = {
      findOne: function (some, cb) {
          cb(undefined, {name:"name", _id:"123", email:"test@test.com", password:"passwd", save:function(a){ return a();}})
        }
    };
    updateUserMW({
      userModel: fakeUserModel
    })(req, res, function (err) {
      expect(res.tpl.name).to.eql("name");
      expect(req.session.name).to.eql("name");
      expect(err).to.eql(undefined);
      done();
    });
  });


});
