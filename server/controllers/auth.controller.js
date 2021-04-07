const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const {
  registerValidation,
  loginValidation
} = require('../helpers/validation')

const create_carts  = require('../helpers/create_carts')


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};



module.exports.signupPOST = async (req, res) => {
  const {
    email,
    password,
    username,
    roles
  } = req.body;
  // validate user fields
  const {
    error
  } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)



  const emailExists = await User.findOne({
    email: req.body.email
  })
  if (emailExists) return res.status(400).send('email already exists')


  const usernameExists = await User.findOne({
    username: req.body.username
  })
  if (usernameExists) return res.status(400).send('username already exists')


  const user = await User.create({
    email,
    password,
    username,
    roles
  });
  const token = createToken(user._id);
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: maxAge * 1000
  });
  res.cookie('loggedin', true, {
    httpOnly: false,

    maxAge: maxAge * 1000
  });
create_carts.createCart()
  res.status(201).json({
    user: user._id
  });





}

module.exports.loginPOST = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  // validate user fields
  const {
    error
  } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // check if email already exists
  const foundUser = await User.findOne({
    email: req.body.email
  })
  if (!foundUser) return res.status(400).send('email is not registered yet')



  const user = await User.login(email, password);
  const token = createToken(user._id);
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: maxAge * 1000
  });
  res.cookie('loggedin', true, {
    httpOnly: false,

    maxAge: maxAge * 1000
  });
  create_carts.createCart()

  res.status(200).json({
    user: user._id
  });


}

module.exports.logoutGET = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1
  });
  res.cookie('loggedin', false, {
    httpOnly: false,

    maxAge: maxAge * 1000
  });
  res.send('user LOGED OUT');
}