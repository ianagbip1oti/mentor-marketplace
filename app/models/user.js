const debug = require('debug')('app:modles:user')

const bcrypt = require('bcrypt-nodejs')

const users = {}

class User {
  constructor(email, password) {
    this.email = email
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  }
  
  save() {
    debug('Saving user %s', this.email)
    users[this.email] = this
  }
  
  static findByEmail(email) {
    return users[email]
  }
}

module.exports = User
