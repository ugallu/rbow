/**
 * This module redirects to / if logged in
 * Note: copied from mintahazi2015
 */

 module.exports = function (objectrepository) {

     return function (req, res, next) {
       console.log("iauth");
         if(typeof req.session !== 'undefined' && typeof req.session.userid !== 'undefined'){
           return res.redirect("/");

         }
         return next();
     };

 };
