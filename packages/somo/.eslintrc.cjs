module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'no-only-tests', 'eslint-comments', 'simple-import-sort'],
  ignorePatterns: ['node_modules', 'dist', 'dev', 'tsup.config.ts', 'vitest.config.ts'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'no-debugger': 'warn',
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
