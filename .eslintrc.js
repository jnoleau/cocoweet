module.exports = {
    extends: [
      'airbnb',
      'plugin:flowtype/recommended'
    ],
    plugins: [
      'flowtype'
    ],
    env: {
      'browser': true
    },
    settings: {
      'flowtype': {
        'onlyFilesWithFlowAnnotation': true
      }
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'no-empty': ['error', {'allowEmptyCatch': true}],
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'object-curly-spacing': ['error', 'never'],

      'react/jsx-filename-extension': ['error', {'extensions': ['.js', '.jsx']}],
      'import/no-unresolved': ['error', {'ignore': [ 'app/' ]}],
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'flowtype/require-parameter-type': 'warn',
      'flowtype/require-return-type': ['warn', 'always', { 'annotateUndefined': 'always' }],
    }
};
