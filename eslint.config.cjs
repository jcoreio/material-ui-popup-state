const { defineConfig } = require('eslint/config')
const globals = require('globals')

module.exports = defineConfig([
  ...require('@jcoreio/toolchain/eslintConfig.cjs'),
  {
    files: ['test/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
      },
    },
  },
  {
    files: ['demo/**'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
      },
    },
    rules: {
      'react/prop-types': 0,
    },
  },
])
