module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    //  'res.locals.user' makes a variable {{ user }} available for all views
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
}
