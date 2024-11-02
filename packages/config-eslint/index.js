module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'no-only-tests', 'eslint-comments', 'simple-import-sort'],
  ignorePatterns: ['node_modules', 'dist', 'dev', 'tsup.config.ts', 'vitest.config.ts'],
  rules: {
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`.
          ['^node:'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^solid', '^@solid', '^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'no-debugger': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-useless-empty-export': 'warn',
    'no-only-tests/no-only-tests': 'warn',
    'eslint-comments/no-unused-disable': 'warn',
  },
};
