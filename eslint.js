module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    jest: true
  },
  settings: {
    'import/parsers': {
      "@typescript-eslint/parser": ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        directory: __dirname
      }
    }
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    'indent': ["error", 2],
    'no-console': [1, {
      allow: ['error', 'info', 'warn']
    }],
    'max-len': ['error', 150],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'import/no-extraneous-dependencies': [
      'error', 
      {'devDependencies': [
        __dirname + '/test/*.ts',
        __dirname + '/test/**/*.ts'
      ] }
    ],
    '@typescript-eslint/indent': ["error", 2],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0
  }
};
