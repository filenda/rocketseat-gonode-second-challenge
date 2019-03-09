module.exports = (req, res, next) => {
  //  'req.session' will always exist as 'saveUninitialized: true' is defined on 'server.js'
  if (req.session && !req.session.user) {
    return next()
  }

  return res.redirect('app/dashboard')
}
