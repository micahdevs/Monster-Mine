const getAuth = (req, res, next) => {
    // TODO: Add a comment describing the functionality of this if statement
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = getAuth;