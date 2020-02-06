const passport = require('passport');
const User = require('./database/models/User');
const bcrypt = require('bcrypt');

// middleware functions
function checkIfAuthenticatedMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json({ error: 'Please log in to continue' });
  }
}

function addSocketIdtoSessionMiddleware(req, res, next) {
  req.session.socketId = req.query.socketId;
  next();
}

// routes
module.exports = function(app, db, io) {
  //get user info
  app.get('/user', function(req, res, next) {
    if (req.user) {
      return res.json({
        user: {
          _id: req.user['_id'],
          username: req.user.username,
          characterSheets: req.user.characterSheets
        }
      });
    }
    return res.json({ user: null });
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info);
      }
      req.logIn(user, function(err) {
        console.log(`the user ${user.username} with id ${user['_id']} has connected`);
        if (err) return next(err);
        return res.json({
          user: {
            _id: user['_id'],
            username: user.username,
            characterSheets: user.characterSheets
          }
        });
      });
    })(req, res, next);
  });

  app.get('/githubLogin', addSocketIdtoSessionMiddleware, passport.authenticate('github'));

  app.get('/github/callback', function(req, res, next) {
    passport.authenticate('github', function(err, user, info) {
      if (err) {
        io.to(req.session.socketId).emit('github login', {
          error: err.message
        });
        return next(err);
      }
      if (!user) {
        io.to(req.session.socketId).emit('github login', {
          error: 'github log in failed'
        });
        return res.json({
          message: 'github log in failed'
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          io.to(req.session.socketId).emit('github login', {
            error: err.message
          });
          return next(err);
        }
        io.to(req.session.socketId).emit('github login', {
          user: {
            _id: user['_id'],
            username: user.username,
            characterSheets: user.characterSheets
          }
        });
        return res.json({
          message: 'logged in successfully'
        });
      });
    })(req, res, next);
  });

  app.post('/register', function(req, res, next) {
    const hash = bcrypt.hashSync(req.body.password, 12);
    User.findOne({ username: req.body.username, provider: 'local' }, function(err, user) {
      if (err) {
        return next(err);
      } else if (user) {
        return res.json({ error: 'Username is unavailable' });
      } else {
        const newUser = new User({
          username: req.body.username,
          password: hash,
          characterSheets: [],
          // providerId: '',
          provider: 'local'
        });
        newUser.save(function(err, user) {
          if (err) {
            return next(err);
          }
          console.log('New user saved to the database');
          req.login(user, function(err) {
            if (err) {
              return next(err);
            }
            return res.json({
              user: {
                _id: user['_id'],
                username: user.username,
                characterSheets: user.characterSheets
              }
            });
          });
        });
      }
    });
  });

  app.post('/characterSheet', checkIfAuthenticatedMiddleware, function(req, res, next) {
    console.log('user id: ' + req.user['_id']);
    User.findOne({ _id: req.user['_id'] }, function(err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        return res.json({ error: 'User not found' });
      } else {
        for (let i = 0; i < user.characterSheets.length; i++) {
          if (user.characterSheets[i].uuid === req.body.uuid) {
            //delete character sheet with same uuid if found
            console.log('deleting existing charsheet');
            user.characterSheets.splice(i, 1);
          }
        }
        const newCharacterSheet = {
          ...req.body
        };
        //insert new character sheet
        user.characterSheets.push(newCharacterSheet);
        user.save(function(err, user) {
          if (err) {
            return next(err);
          }
          console.log('Updated user doc: ' + user);
          res.json({
            message: 'Character sheet saved',
            user: {
              _id: user['_id'],
              username: user.username,
              characterSheets: user.characterSheets
            }
          });
        });
      }
    });
  });

  app.post('/characterSheetDelete', checkIfAuthenticatedMiddleware, function(req, res, next) {
    User.findOne({ _id: req.user['_id'] }, function(err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        return res.json({ error: 'User not found' });
      } else {
        for (let i = 0; i < user.characterSheets.length; i++) {
          if (user.characterSheets[i].uuid === req.body.uuid) {
            user.characterSheets.splice(i, 1);
            console.log('Character sheet deleted');
          }
        }
        user.save(function(err, user) {
          if (err) {
            return next(err);
          }
          res.json({
            message: 'Character sheet deleted',
            user: {
              _id: user['_id'],
              username: user.username,
              characterSheets: user.characterSheets
            }
          });
        });
      }
    });
  });

  app.post('/logout', function(req, res) {
    if (req.user) {
      req.logout();
      return res.json({ message: 'logout complete' });
    } else {
      return res.json({ message: 'logout failed' });
    }
  });

  //error handler
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
  });
};
