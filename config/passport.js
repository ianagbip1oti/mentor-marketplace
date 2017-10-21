const debug = require('debug')('config:passport')

const LocalStrategy = require('passport-local').Strategy

const User = require('../app/models/user.js')

module.exports = function (passport) {
  debug('Configuring passport...')
  passport.serializeUser((user, done) => done(null, user.email))
  passport.deserializeUser((email, done) => done(null, User.findByEmail(email)))
   
  debug('Setting up local-signup strategy')
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, (req, email, password, done) => {
    debug('Signing up %s', email)

    var existing = User.findByEmail(email)

    if (existing) {
      done(null, false, req.flash('signupMessage', 'That email is already registered'))
    } else {
      var newUser = new User(email, password)
      newUser.save()
      done(null, newUser)
    }
  }))
  debug('Passport configured.')
}
