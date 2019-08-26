const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../db/models/user');

// ===== Define and create basicStrategy =====
const localStrategy = new LocalStrategy((email, password, callback) => {
  let user;
  User.findOne({ email })
    .then(results => {
      user = results;
      if (!user) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect email',
          location: 'email'
        });
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'LoginError',
          message: 'Incorrect password',
          location: 'password'
        });
      }
      return callback(null, user);
    })
    .catch(err => {
      if (err.reason === 'LoginError') {
        return callback(null, false);
      }
      return callback(err);
    });
});

module.exports = localStrategy;
