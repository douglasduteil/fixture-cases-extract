'use strict'

var _ = {
  assign: require('lodash.assign'),
  reduce: require('lodash.reduce')
}
var fs = require('fs')
var path = require('path')

//

module.exports = fixtureCasesExtract

//

function fixtureCasesExtract (options) {
  options = _.assign({
    basePath: __dirname,
    fileMap: {}
  }, options)

  return fs
    .readdirSync(options.basePath)
    .filter(function isDirectory (fileName) {
      return fs.statSync(path.join(options.basePath, fileName)).isDirectory()
    })
    .map(_createFixtureDescription)

  //

  function _createFixtureDescription (fixtureName) {
    var base = path.resolve(options.basePath, fixtureName)
    return _.assign({
      base: base,
      name: fixtureName.replace(/[-_]/g, ' ')
    }, _resolveFileMap(options.fileMap, base))
  }

  function _resolveFileMap (fileMap, base) {
    return _.reduce(fileMap, function resolveInBase (memo, fileName, fileKey) {
      var filePath = path.resolve(base, fileName)
      var isExisting = _isExisting(filePath)

      if (isExisting) {
        memo[fileKey] = path.resolve(base, fileName)
      }

      return memo
    }, {})
  }

  function _isExisting (path) {
    var result = false
    try {
      fs.statSync(path)
      result = true
    } catch (e) {}

    return result
  }
}
