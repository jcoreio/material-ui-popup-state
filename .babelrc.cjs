/* eslint-env node, es2018 */
module.exports = function (api) {
  const base = require('@jcoreio/toolchain-esnext/.babelrc.cjs')(api)
  return {
    ...base,
  }
}
