const app = require('express')()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')

app.use(morgan('dev'))

require('./config/passport.js')(passport)

app.use(session({ secret: 'not so secret' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set('view engine', 'ejs')

require('./app/routes.js')(app, passport)

app.listen(process.env.PORT || 3000)
