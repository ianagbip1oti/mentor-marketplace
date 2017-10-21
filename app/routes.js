
const Mentor = require('./models/mentor.js')

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

module.exports = (app, passport) => {
  app.get('/', (req, res) => res.render('index', { mentors: Mentor.all() }))

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
  
  app.post('/become-mentor', (req, res) => {
    new Mentor(req.user.email, req.body.title, req.body.description, req.body.price).save()
    
    res.redirect('/')
  })
  
  app.get('/become-mentor', isLoggedIn, (req, res) => res.render('become-mentor', { message: req.flash('becomeMentorMessage') }))
}
