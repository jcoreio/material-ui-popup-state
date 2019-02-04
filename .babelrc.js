module.exports = function(api) {
  const plugins = [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
  ]
  const presets = [
    [
      '@babel/preset-env',
      api.env('es5')
        ? { forceAllTransforms: true }
        : { targets: { node: 'current' } },
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
