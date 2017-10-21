const debug = require('debug')('app:models:mentor')

const mentors = new Map()

class Mentor {
  constructor(email, title, description, price) {
    this.email = email
    this.title = title
    this.description = description
    this.price = price
  }
  
  save() {
    debug("Saving mentor for %s", this.email)
    mentors.set(this.email, this)
  }
  
  static all() {
    return mentors.values()
  }
}

module.exports = Mentor

