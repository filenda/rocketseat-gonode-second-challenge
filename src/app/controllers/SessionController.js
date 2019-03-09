const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('/app/dashboard')
  }

  destroy (req, res) {
    req.session.destroy(() => {
      //  this code excutes as a callback of the session destruction;
      //  'root' is the name of the session defined in 'server.js' which
      //  is given to the cookie on the client browser
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}

module.exports = new SessionController()
