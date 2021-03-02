/* eslint-disable no-console */

// Makes sure the tests fails when a PropType validation fails.
function consoleError() {
  console.error = (...args) => {
    // Can't use log as karma is not displaying them.
    console.info(...args)
    if (/ExperimentalWarning/.test(args[0])) return
    throw new Error(...args)
  }
}

module.exports = consoleError
