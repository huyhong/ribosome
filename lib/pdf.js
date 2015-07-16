module.exports = pdf = {}

var fs = require('fs')
var Prince = require("prince")

var options = {
  debug: true
}

pdf.generate = function(htmlPath, pdfPath, success, error) {
  Prince(options)
    .inputs(htmlPath)
    .output(pdfPath)
    .execute()
    .then(function() {
      fs.readFile(pdfPath, function(err, pdfContent) {
        if (err) {
          error(err)
        } else {
          success(pdfContent)
        }
      })
    }, function(err) {
      error(err)
    })
}
