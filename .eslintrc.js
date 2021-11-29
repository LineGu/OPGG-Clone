module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'airbnb-base', // or airbnb-base
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended', // 설치 한경우
    'plugin:import/errors', // 설치한 경우
    'plugin:import/warnings', // 설치한 경우
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    camelcase: 'off',
    'no-console': 'off',
    'prettier/prettier': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-use-before-define': 'off',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    'no-underscore-dangle': 'off',
    'react/require-default-props': 'off',
    'import/no-unresolved': 'off',
    'click-events-have-key-events': 'off',
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/mouse-events-have-key-events': ['off'],
    'react/jsx-key': ['off'],
    'jsx-a11y/no-static-element-interactions': [
      'error',
      {
        handlers: ['onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],

    // airbnb ESLint 구성의 문제를 해결하기 위함
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: '**/*.spec.ts',
};
