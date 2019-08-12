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

  passport.deserializeUser((_id, done) => {
    User.findOne({ _id: _id }, (err, doc) => {
      if (err) {
        return done(err);
      }
      done(null, doc);
    });
  });

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username, provider: 'local' }, function(err, user) {
        if (err) return done(err);
        if (!user)
          return done(null, false, {
            authenticationError: 'User does not exist',
            errorField: 'username'
          });
        if (user.password && !bcrypt.compareSync(password, user.password)) {
          return done(null, false, {
            authenticationError: 'Incorrect password',
            errorField: 'password'
          });
        } else if (user.password && bcrypt.compareSync(password, user.password)) {
          console.log(`User ${username} has logged in.`);
          return done(null, user);
        }
      }).catch(error => {
        done(error);
      });
    })
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        // development
        // callbackURL: 'http://localhost:3001/github/callback'
        // production
        callbackURL: 'https://morning-castle-644884.herokuapp.com/github/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ providerId: profile.id }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              username: profile.username,
              characterSheets: [],
              providerId: profile.id,
              provider: 'GitHub'
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
};
