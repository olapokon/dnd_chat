const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
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

  //mongoose strategy
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        console.log(`User ${username} attempted to log in.`);
        if (err) return done(err);
        if (!user) return done(null, false, { authenticationError: 'Username does not exist' });
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { authenticationError: 'Incorrect password' });
        }
        console.log(`User ${username} has logged in.`);
        return done(null, user);
      });
    })
  );
};
