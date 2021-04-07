const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { string } = require('joi');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
  },
  username: {
    type: String,
    trim: true,
    default: '',
    required: [true, 'Please enter a username'],
    unique: [true, 'username already exists'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  bio: {
    type: String,
    default: '404 bio not found'
  },
  image: {type:String,default:null},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  birthday: {
    type: Date,
    default: Date.now ,
  },
  location: {
    type: String,
    default: '',
  },
  Living:String,

  school: {
    type: String,
    default: '',
  },
  relashioshipStatus: {
    type: String,
    default: '',
  },
  sex:String,

  followers: [{type:String,    default: [''],}],
  followings: [{type:String,    default: [''],}],

 

  isSeller:      {
    type: Boolean,
    default: false,
  },

  storeId:String,
});

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {


  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({
    email
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;