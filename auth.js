const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./database/models/User');

module.exports = function(app, db) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //mongoose deserialize
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, doc) => {
      done(null, doc);
    });
  });

  //local strategy
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        console.log(`User ${username} attempted to log in.`);
        if (err) return done(err);
        if (!user)
          return done(null, false, {
            authenticationError: 'Username does not exist',
            errorField: 'username'
          });
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {
            authenticationError: 'Incorrect password',
            errorField: 'password'
          });
        }
        console.log(`User ${username} has logged in.`);
        return done(null, user);
      });
    })
  );

  // =================================================================================================
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/github/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ username: profile.username }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              username: profile.username,
              id: profile.id,
              provider: 'Github'
            });
            newUser.save(function(err, user) {
              if (err) {
                return done(err);
              }
              console.log(`User ${user.username} saved to the database`);
              done(null, newUser);
            });
          }
        });
      }
    )
  );
  // =================================================================================================
};
