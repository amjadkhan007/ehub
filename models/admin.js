var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if(!email) {
    return false;
  }
  else {
    if(email.length < 5 || email.length > 30) {

      return false; 

    }
    else {

      return true;
    }

  }
  
};

let validateEmail = (email) => {
   if(!email) {
    return false;
  }
  else {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};

const emailValidators = [
  {
    validator: emailLengthChecker,
    message: 'Email Must be at least 5 characters long, but must not be greate than 30 characters'
  },
  {
    validator: validateEmail,
    message: 'Must be a valid e-mail'
  }
];

let usernameLengthChecker = (username) => {
  if(!username) {
    return false;
  }
  else {
    if(username.length < 4 || username.length > 10) {
      return false;
    } else {
      return true;
    }
  }

};

let validateUsername = (username) => {
  if(!username) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z\-0-9]+$/);
    return regExp.test(username);
  }
}

const usernameValidators = [
  {
    validator: usernameLengthChecker,
    message: "User name must be atleast 4 characters long but must not exceed 10 characters"
  },
  {
    validator: validateUsername,
    message: "User Name Can only be an Alpha neumeric"
  }
];

let passwordLengthChecker = (password) => {
  if(!password) {
    return false;
  }
  else {
    if(password.length < 8 || password.length > 20) {
      return false;
    } else {
      return true;
    }
  }

};

let validatePassword = (password) => {
  if(!password) {
    return false;
  } else {
    const regExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    return regExp.test(password);
  }
}

const passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: "Password must be atleast 8 characters long but must not exceed 20 characters"
  },
  {
    validator: validatePassword,
    message: "Minimum eight characters, at least one letter and one number:"
  }
];

var adminSchema = new Schema({
  email:  { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username:  { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  fname:  { type: String, required: true, unique: true, validate: usernameValidators },
  lname:  { type: String, required: true, unique: true, validate: usernameValidators },
  password: { type: String, required: true, validate: passwordValidators },
  aprroved: {type: String, required: true, default: 'false'},
  usertype: { type: String, enum: ["admin", "user", "guest"], required: true, default: 'user' }
  
});

adminSchema.pre('save', function (next) {
  if(!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, null, null, (err, hash) => {
    // Store hash in your password DB.
    if(err) {
      return next(err);
    }

    this.password = hash;
    next();
});

});

adminSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Admin', adminSchema);