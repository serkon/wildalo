module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      tsx: true, // Allows for the parsing of TSX ???
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'object-shorthand': 'error',
    'no-confusing-arrow': [
      'error',
      {
        allowParens: false,
      },
    ],
    semi: ['error', 'always'],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-restricted-imports': ['error', { patterns: ['../*'] }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'as-needed'],
    indent: [2, 2, { SwitchCase: 1}],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-before-blocks': ['error', { functions: 'always', keywords: 'always', classes: 'always' }],
    'padded-blocks': ['error', { classes: 'always', blocks: 'never' }],
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'function' }, { blankLine: 'always', prev: 'function', next: '*' }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'max-len': ['error', { code: 180, ignoreUrls: true, ignoreStrings: true, ignoreTrailingComments: true, ignoreTemplateLiterals: true }],
    'no-mixed-operators': 'error',
    'quote-props': ['error', 'as-needed'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
    'jsx-quotes': ['error', 'prefer-double'],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockStart: true,
        allowBlockEnd: false,
        allowObjectStart: true,
        allowObjectEnd: false,
        allowArrayStart: true,
        allowArrayEnd: false,
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['/'],
          exceptions: ['-', '+'],
        },
        block: {
          markers: ['!'],
          exceptions: ['*'],
          balanced: true,
        },
      },
    ],
    'newline-before-return': 'error',
  },
  overrides: [
    {
      files: ['**/*.json', '**/*.jsonc'],
      rules: {
        'comma-dangle': ['error', 'never'],
        semi: ['error', 'never'],
        quotes: ['error', 'double'],
        'quote-props': ['error', 'consistent'],
        'max-len': ['error', { code: 80, ignoreStrings: true, ignoreRegExpLiterals: true, ignoreTemplateLiterals: true }],
      },
    },
  ],
};
