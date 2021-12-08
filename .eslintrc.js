module.exports = {
  extends: [
    'react-app',
    'airbnb',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'eslint-plugin-prettier', 'css-modules', 'prettier'],
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    camelcase: 'error',
    'func-names': ['error', 'never'],
    'global-require': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: ['*'], next: ['return'] },
      { blankLine: 'always', prev: ['*'], next: ['try'] },
    ],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        endOfLine: 'auto',
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/destructuring-assignment': [
      'error',
      'always',
      { ignoreClassFields: true },
    ],
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        ignoreCase: true,
        reservedFirst: ['key', 'ref'],
        shorthandFirst: true,
      },
    ],
    'react/no-array-index-key': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': ['off', 'static public field'],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
};
