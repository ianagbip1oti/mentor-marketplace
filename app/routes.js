
module.exports = (app, passport) => {
  app.get('/', (req, res) => res.render('index'))

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))

  app.get('/login', (req, res) => res.render('login', { message: req.flash('loginMessage') }))

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  app.get('/signup', (req, res) => res.render('signup', { message: req.flash('signupMessage') }))
}
