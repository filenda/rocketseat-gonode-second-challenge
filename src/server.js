const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const nunjucks = require('nunjucks')
const flash = require('connect-flash')
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production' // Development, Production, Testing

    //  Make sure to follow the exact calling order bellow
    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(flash())
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret', // this crypto password should go somewhere else
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
  }

  views () {
    // __dirname is equivalent to the current file's directory
    //  'app' and 'views' are folder to be accessed in the exact order declared here
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    //  tells express to make the 'public' folder and it's files publicly accessable
    this.express.use(express.static(path.resolve(__dirname, 'public')))
    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

//  exports only the object of interest (aka express) of an instance of 'App'
module.exports = new App().express
