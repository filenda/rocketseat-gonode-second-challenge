const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL, // 'virtual' means it won't be created on the DB and is only used on the application
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  //  this is how you create custom methods on you domain models
  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
