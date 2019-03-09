const { User } = require('../models')

class UserController {
  create (req, res) {
    return res.render('auth/signup')
  }

  async store (req, res) {
    //  ES6: Extracts the filename property from the file object comming from the user and renames it to 'avatar'
    const { filename: avatar } = req.file

    //  the line bellow passes an object grabbing all properties from the body using the '...', plus the filename as the avatar property
    await User.create({ ...req.body, avatar })

    return res.redirect('/')
  }
}

module.exports = new UserController()
