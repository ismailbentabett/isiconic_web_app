const jwt = require('jsonwebtoken');
const User = require('../models/user.model');



const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/api/auth/login' || '/api/auth/signup');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    const maxAge = 3 * 24 * 60 * 60;

    res.cookie('loggedin', false, {
      httpOnly: false,
  
      maxAge: maxAge * 1000
    });
   res.redirect('/' || '/');
  }
};

// check current user
const checkUser = (req, res, next) => {

  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user; //need to fix this
        req.userData = user; // Add to req object
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};




// check current user
const isAdminAuth = async (req, res, next) => {

  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/api/auth/login');
      } else {
        let user = await User.findById(decodedToken.id);
        if (user.roles[1] == 'admin') {
          next();

        } else {
          res.status(403).send('u aint admin nigga')

        }
      }
    });
  } else {
    const maxAge = 3 * 24 * 60 * 60;

    res.cookie('loggedin', false, {
      httpOnly: false,
  
      maxAge: maxAge * 1000
    });
    res.redirect('/');
  }
};



module.exports = {
  requireAuth,
  checkUser,
  isAdminAuth
};