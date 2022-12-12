module.exports = function (api) {
  api.cache.using(() => process.env.OUTPUT_ESM)
  const plugins = []
  if (process.env.OUTPUT_ESM) {
    plugins.push(function () {
      function transformSource(source) {
        if (source?.value.startsWith('.')) {
          source.value = source.value.replace(/(\.m?(js|ts)?)?$/, '.mjs')
        }
      }
      return {
        visitor: {
          ImportDeclaration(path) {
            transformSource(path.node.source)
          },
          CallExpression(path) {
            if (path.node.callee.type === 'Import') {
              transformSource(path.node.arguments[0])
            }
          },
          ExportNamedDeclaration(path) {
            transformSource(path.node.source)
          },
        },
      }
    })
  }
  const presets = [
    [
      '@babel/preset-env',
      api.env('es5')
        ? { forceAllTransforms: true }
        : {
            modules: process.env.OUTPUT_ESM ? false : undefined,
            targets: { node: '12' },
          },
    ],
    ['@babel/preset-typescript', { allowDeclareFields: true }],
    '@babel/preset-react',
  ]

  plugins.push('@babel/plugin-transform-runtime')
  if (api.env('coverage')) {
    plugins.push('babel-plugin-istanbul')
  }

  return { plugins, presets }
}
