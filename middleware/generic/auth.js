/**
 * Redirect to / if not logged in
 *
 */
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof req.session === 'undefined' || typeof req.session.userid === 'undefined'){
          return res.redirect("/");
        }
        return next();
    };

};
