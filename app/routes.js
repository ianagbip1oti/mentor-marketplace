
module.exports = (app, passport) => {
  app.get('/', (req, res) => res.render('index'))

  app.get('/login', (req, res) => res.render('login', { message: req.flash('loginMessage') }))

  app.get('/signup', (req, res) => res.render('signup', { message: req.flash('signupMessage') }))
}
