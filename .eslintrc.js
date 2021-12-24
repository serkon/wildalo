module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'root': true,
  'extends': [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', 'prettier'],
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

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'semi': ['error', 'always'],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': [
      'error',
      { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-restricted-imports': ['error', { 'patterns': ['../*'] }],
    'lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'indent': 'off',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'space-before-function-paren': [
      'error',
      { 'anonymous': 'always', 'named': 'always', 'asyncArrow': 'always' },
    ],
    'padded-blocks': ['error', { 'classes': 'always', 'blocks': 'never' }],
    'padding-line-between-statements': [
      'warn',
      { 'blankLine': 'always', 'prev': '*', 'next': 'function' },
      { 'blankLine': 'always', 'prev': 'function', 'next': '*' },
    ],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'max-len': ['error', { 'code': 180, 'ignoreUrls': true }],
    'no-mixed-operators': 'error',
    'quote-props': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'quoteProps': 'preserve',
        'trailingComma': 'all',
        'semi': true,
        'tabWidth': 2,
        'useTabs': false,
        'bracketSameLine': true,
        'bracketSpacing': true,
        'arrowParens': 'always',
        'requirePragma': true,
        'vueIndentScriptAndStyle': true,
        'htmlWhitespaceSensitivity': 'strict',
      },
    ],
  },
  'overrides': [
    {
      'files': ['**/*.json', '**/*.jsonc'],
      'rules': {
        'comma-dangle': ['error', 'never'],
        'semi': ['error', 'never'],
        'quotes': ['error', 'double'],
      },
    },
  ],
};
