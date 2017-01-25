/**
 * The middleware redirects to login page if not logged in - else to overview.
 *
 */

module.exports = function (objectRepo){

  return function (req, res, next){
    if(typeof req.session.userid === 'undefined'){
      return res.redirect("/login");
    }
    else{
      return res.redirect("/tables");
    }
  };

};
