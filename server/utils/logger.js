require('colors')
const _ = require('lodash')

const config = require('../config')

const consoleLog = config.logging ? console.log.bind(console) : () => {}

const logger = {
  log: function() {
    const tag = '✏️  LOG -'.white
    const args = _.toArray(arguments)
      .map((arg = {}) => {
        if (typeof arg === 'object') {
          const string = JSON.stringify(arg, null, 2)
          return `${ tag } ${ string.cyan }`
        }
        return `${ tag } ${ arg.cyan }`
      })

    consoleLog.apply(console, args)
  },

  error: function() {
    const args = _.toArray(arguments)
      .map((arg) => {
        arg = arg.stack || arg
        const name = arg.name || '❌ ERROR -'
        const log = `${ name.white } ${ arg.red }`
        return log
      })

    consoleLog.apply(console, args)
  }
}

module.exports = logger