/**
 * Logs out the the given user
 *
 */


module.exports = function (objectRepo){

  return function (req, res, next) {
      req.session.destroy(function (err) {
        return next();
      });
    };

};
