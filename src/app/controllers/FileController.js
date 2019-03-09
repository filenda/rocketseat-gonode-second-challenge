const path = require('path')

class FileController {
  show (req, res) {
    //  Bellow line grabs the file param from the params passed to the route
    const { file } = req.params

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'upload',
      file
    )

    return res.sendFile(filePath)
  }
}

module.exports = new FileController()
