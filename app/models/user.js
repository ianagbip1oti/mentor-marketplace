const debug = require('debug')('app:modles:user')

const bcrypt = require('bcrypt-nodejs')

const users = {}

function User (email, password) {
  this.email = email
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

User.prototype.save = function () {
  debug('Saving user %s', this.email)
  users[this.email] = this
}

User.findByEmail = (e) => users[e]

module.exports = User
