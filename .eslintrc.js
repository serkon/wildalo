module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'root': true,
  'extends': ['prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', 'prettier', 'unused-imports'],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'settings': {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      'typescript': {},
    },
  },
  'rules': {
    '@typescript-eslint/no-empty-interface': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'prefer-destructuring': [
      'error',
      {
        'VariableDeclarator': {
          'array': false,
          'object': true,
        },
        'AssignmentExpression': {
          'array': true,
          'object': false,
        },
      },
      {
        'enforceForRenamedProperties': false,
      },
    ],
    'object-shorthand': 'error',
    'no-confusing-arrow': [
      'error',
      {
        'allowParens': false,
      },
    ],
    'semi': ['error', 'always'],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-restricted-imports': ['error', { 'patterns': ['../*'] }],
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'indent': 'off',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': ['warn', { 'blankLine': 'always', 'prev': '*', 'next': 'function' }, { 'blankLine': 'always', 'prev': 'function', 'next': '*' }],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'max-len': ['error', { 'code': 180, 'ignoreUrls': true, 'ignoreStrings': true, 'ignoreTrailingComments': true, 'ignoreTemplateLiterals': true }],
    'no-mixed-operators': 'error',
    'quote-props': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }],
  },
  'overrides': [
    {
      'files': ['**/*.json', '**/*.jsonc'],
      'rules': {
        'comma-dangle': ['error', 'never'],
        'semi': ['error', 'never'],
        'quotes': ['error', 'double'],
        'max-len': ['error', { 'code': 80, 'ignoreStrings': true, 'ignoreRegExpLiterals': true, 'ignoreTemplateLiterals': true }],
      },
    },
  ],
};
