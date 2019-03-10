const moment = require('moment')
const { Op } = require('sequelize') //  lib that behaves similar to c# linq
const { User, Appointment } = require('../models')

class DashboardController {
  async index (req, res) {
    const { provider, id } = req.session.user

    /// in case the logged user is a provider
    if (provider === true) {
      const dateToBeSent = req.query.date
        ? req.query.date
        : new Date().getTime()
      const date = moment(parseInt(dateToBeSent))
      const appointments = await Appointment.findAll({
        include: [User],
        where: {
          provider_id: id,
          date: {
            [Op.between]: [
              date.startOf('day').format(), // '.format()' converts the date to string so the DB can understand
              date.endOf('day').format()
            ]
          }
        }
      })

      if (req.query.partial === 'true') {
        return res.render('appointments/_index', { appointments })
      } else {
        return res.render('provider-dashboard', { appointments })
      }
    } else {
      const providers = await User.findAll({ where: { provider: true } })

      return res.render('dashboard', { providers })
    }
  }
}

module.exports = new DashboardController()
