const debug = require('debug')('app:models:user')

const bcrypt = require('bcrypt-nodejs')

const users = {}

class User {
  constructor (email, password) {
    this.email = email
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  }

  isPassword (password) {
    return bcrypt.compareSync(password, this.password)
  }

  save () {
    debug('Saving user %s', this.email)
    users[this.email] = this
  }

  static findByEmail (email) {
    return users[email]
  }
}

module.exports = User
