const debug = require('debug')('config:passport')

const LocalStrategy = require('passport-local').Strategy

const User = require('../app/models/user.js')

module.exports = function (passport) {
  debug('Configuring passport...')
  passport.serializeUser((user, done) => done(null, user.email))
  passport.deserializeUser((email, done) => done(null, User.findByEmail(email)))

  const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }

  debug('Setting up local-signup strategy')
  passport.use('local-signup', new LocalStrategy(strategyOptions, (req, email, password, done) => {
    debug('Signing up %s', email)

    const existing = User.findByEmail(email)

    if (existing) {
      done(null, false, req.flash('signupMessage', 'That email is already registered'))
    } else {
      const newUser = new User(email, password)
      newUser.save()
      done(null, newUser)
    }
  }))

  debug('Setting up local-login strategy')
  passport.use('local-login', new LocalStrategy(strategyOptions, (req, email, password, done) => {
    debug('Logging in %s', email)
    const user = User.findByEmail(email)

    if (user && user.isPassword(password)) {
      done(null, user)
    } else {
      done(null, false, req.flash('loginMessage', 'Invalid login'))
    }
  }))

  debug('Passport configured.')
}
