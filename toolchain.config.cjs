/* eslint-env node, es2018 */
module.exports = {
  cjsBabelEnv: { forceAllTransforms: true },
  esmBabelEnv: { targets: { node: 16 } },
  // outputEsm: false, // disables ESM output (default: true)
  // esWrapper: true, // outputs ES module wrappers for CJS modules (default: false)
  // scripts: {
  //   pretest: 'docker compose up -d',
  //   jsExample: {
  //     description: 'example of running a JS script',
  //     run: async (args = []) => console.log('TEST', ...args),
  //   },
  // }
}
