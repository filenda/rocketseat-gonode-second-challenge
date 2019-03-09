const moment = require('moment')
const { Op } = require('sequelize') //  lib that behaves similar to c# linq
const { Appointment } = require('../models')

class AvailableController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(), // '.format()' converts the date to string so the DB can understand
            date.endOf('day').format()
          ]
        }
      }
    })

    const schedule = [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')
      //  the line bellow grabs the date selected by the user and set its
      //  hour and minute value to every (map function above) timestamp
      //  defined on 'schudule' array
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      return {
        time,
        value: value.format(), // '.format()' makes it readable
        available:
          value.isAfter(moment()) && // '.moment()' equals c# 'DateTime.Now'
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })

    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
