var path = require('path')
var fs = require('fs')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var moduleDir = path.dirname(module.filename)
var renderJSPath = path.join(moduleDir, 'render.js')

module.exports = html = {}

html.save = function(url, htmlPath, success, error) {
  var args = [
    '--ignore-ssl-errors=yes',
    renderJSPath,
    url
  ]
  var options = {
    maxBuffer: 500*1024
  }
  childProcess.execFile(phantomjs.path, args, options, function(err, stdout, stderr) {
    if (err) {
      // PhantomJS doesn't always output errors via stderr
      error(stderr)
      error(stdout)
      error(err)
    } else {
      fs.writeFile(htmlPath, stdout, function(err) {
        if (err) {
          error(err)
        } else {
          success(stdout)
        }
      })
    }
  })
}
