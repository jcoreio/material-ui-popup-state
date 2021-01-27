module.exports = function (api) {
  const plugins = [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
  ]
  const presets = [
    [
      '@babel/preset-env',
      api.env('es5')
        ? { forceAllTransforms: true }
        : { targets: { node: '12' } },
    ],
    '@babel/preset-flow',
  ]

  if (api.env(['test', 'coverage', 'es5'])) {
    plugins.push('@babel/plugin-transform-runtime')
  }
  if (api.env('coverage')) {
    plugins.push('babel-plugin-istanbul')
  }

  return { plugins, presets }
}
