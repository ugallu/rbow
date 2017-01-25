var expect = require('chai').expect;
var getFunctionsMW = require('../middleware/function/getFunctions');
describe('getFunctions middleware ', function () {
  it('should return functions', function (done) {
    var req = {url:""}; var res = { tpl: {} };
    var fakeFunctionModel = { find: function (some, cb) {
        cb(undefined, ['function1', 'function2'])
      } };
    getFunctionsMW({
      functionModel: fakeFunctionModel
    })(req, res, function (err) {
      expect(res.tpl.functions).to.eql(['function1', 'function2']);
      expect(err).to.eql(undefined);
      done();
    });
  });

});
