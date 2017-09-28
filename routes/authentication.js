const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


module.exports = (router) => {

  router.post('/register', (req, res) => {

    // req.body.email;
    // req.body.username;
    // req.body.password;

    if(!req.body.email) {
      res.json({ success: false, message: 'You must provide an email'});

    } else {

      if(!req.body.username) {
        res.json({ success: false, message: 'You must provide an user name'});

      } else {
        if(!req.body.fname) {
          res.json({ success: false, message: 'You must provide first name'});
        } else {
          if(!req.body.lname) {
            res.json({ success: false, message: 'You must provide last name'});
          } else {
            if(!req.body.password) {
              res.json({ success: false, message: 'You must provide a password'});
            }
            else {
              let user = new Admin({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                fname: req.body.fname,
                lname: req.body.lname,
                password: req.body.password
              });

              user.save((err) => {
                if(err) {
                  if(err.code === 11000) {
                    res.json({ success: false, message: 'Email or User name Already Exists'});
                  }
                  else {
                    if(err.errors) {
                      if(err.errors.email) {
                        res.json({ success: false, message: err.errors.email.message});
                      }

                      else {
                        if(err.errors.username) {
                          res.json({ success: false, message: err.errors.username.message});
                        }
                        else {
                          if(err.errors.fname) {
                            res.json({ success: false, message: err.errors.fname.message});
                          } else {
                            if(err.errors.lname) {
                              res.json({ success: false, message: err.errors.lname.message});
                            } else {
                              if(err.errors.password) {
                                res.json({ success: false, message: err.errors.password.message});
                              }
                              else {
                                res.json({ success: false, message: 'User Could not be saved', err});
                              }
                            }
                          }                                      
                        }
                      }
                    }
                    else {
                      res.json({ success: false, message: 'User Could not be saved', err});
                    }
                    
                  }
                  
                } else  {
                  res.json({ success: true, message: 'Registered Successfully'});
                }
              }); 
            }
          }
        }                          
      }
    }
  });

  router.get('/checkEmail/:email', (req, res) =>{
    var email = req.params.email;
    //console.log(email);
    if(!email) {
      res.json({success: false, message: 'E-mail was not provided'});
    }

    else {
      Admin.findOne({ email: email }, (err, usr) => {
        if(err) {
          res.json({success: false, message: err});
        }
        else if(usr) {
          res.json({success: false, message: 'E-mail is already taken' });
        }
        else {
          res.json({success: true, message: 'E-mail is available' });

        }
      });
    }
  });


  router.get('/checkUsername/:username', (req, res) =>{
    if(!req.params.username) {
      res.json({success: false, message: 'Username was not provided'});
    }

    else {
      Admin.findOne({ username: req.params.username }, (err, usr) => {
        if(err) {
          res.json({success: false, message: err});
        }
        else if(usr) {
          res.json({success: false, message: 'Username is already taken' });
        }
        else {
          res.json({success: true, message: 'Username is available' });

        }
      });
    }
  });


  router.post('/login', (req, res) => {
    if(!req.body.username) {
      res.json({ success: false, message: 'Username required'});
    } else {
      if(!req.body.password) {
        res.json({ success: false, message: 'Password is required '});
      } else {

        Admin.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
          if(err) {
            res.json({ success: false, message: err});
          } else {
            if(!user) {
              res.json({ success: false, message: 'User not found'});
            } else {

              if(user.aprroved !== 'true') {
                res.json({ success: false, message: 'User not yet approved!'});
              } else {
                const validPassword = user.comparePassword(req.body.password);
                if(!validPassword) {
                  res.json({ success: false, message: 'Invalid Password'});
                } else {
                  const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                  res.json({success: true, message: ' Logged in Successfully', token: token, user: { username: user.username } });
                }
              }
            }
          }
        });
        
      }
    }
  });


  //Profile Route

  router.use(function(req, res, next) {
    var token = req.headers['authorization'];

    if(!token) {
      res.json({ success: false, message: 'No token provided'});
    } else {
      jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
          res.json({ success: false, message: 'Token Inavlid ' + err });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }

  });




  router.get('/profile', function(req, res) {
    //res.send(req.decoded);
    Admin.findOne({ _id: req.decoded.userId }) .select('username email fname lname').exec((err, user) => {
      if(err) {
        res.json({ success: false, message: err});
      } else {
        if(!user) {
          res.json({ success: false, message: 'User not found'});
        } else {
          res.json({ success: true, user: user});
        }
      }
    });
  });

  router.get('/publicProfile/:username', function(req, res) {
    //res.send(req.decoded);
    if(!req.params.username) {
      res.json({ success: false, message: 'username not provided'});
    } else {
      Admin.findOne({ username: req.params.username }) .select('username email fname lname').exec((err, user) => {
        if(err) {
          res.json({ success: false, message: err});
        } else {
          if(!user) {
            res.json({ success: false, message: 'User not found'});
          } else {
            res.json({ success: true, user: user});
          }
        }
      });
    }
    
  });

  router.get('/pendingUsers', (req, res) => {
    Admin.findOne({_id: req.decoded.userId}, (err, user) => {
      if(err) {
        res.json({ success: false, message: err});
      } else {
        if(!user) {
          res.json({ success: false, message: 'User not found!'});
        } else {
          if(user.aprroved === 'false') {
            res.json({ success: false, message: 'User not yet approved!'});
          } else {
            if(user.usertype !== 'admin') {
              res.json({ success: false, message: 'You are not authorized to view this page!'});
            } else {
              User.find({ aprroved: 'false'}, (err, users) => {
                if(err) {
                  res.json({ success: false, message: err});
                } else {
                  res.json( { success: true, users: users});
                }
              });
            }
          }
        }
      }
    });
  });

  return router;
}