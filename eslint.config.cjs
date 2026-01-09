const reactPlugin = require('eslint-plugin-react');

/**
 * Modern, Node-first ESLint configuration (flat config).
 * - Focuses on Node best-practices and error handling
 * - Adds formatting rules for consistency
 * - Provides file-scoped overrides for tests and frontend (React)
 */
module.exports = [
  // Global ignores (must be in separate config at start of array)
  {
    ignores: [
      'node_modules/**',
      'package-lock.json',
      'dist/**',
      'build/**',
      'coverage/**',
      '.github/workflows/**',
      'frontend/assets/images/**',
    ],
  },

  // Main config (applies to all .js/.jsx files not ignored)
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: { react: reactPlugin },
    rules: {
      // Best Practices & Error Handling
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'all'],
      'no-implicit-coercion': 'warn',
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'no-throw-literal': 'error',
      'no-useless-catch': 'error',
      'no-async-promise-executor': 'error',
      'consistent-return': 'error',
      'handle-callback-err': 'error',

      // Formatting
      indent: ['error', 2, { SwitchCase: 1 }],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-parens': ['error', 'as-needed'],
      'max-len': ['warn', { code: 120 }],

      // Error-prone patterns
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-unreachable': 'error',

      // Node specific (keep console allowed for server logs)
      'no-console': 'off',
    },
  },

  // Test files override (jest globals & relaxed rules)
  {
    files: ['**/test/**', '**/*.test.js', '**/__tests__/**'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      'no-unused-expressions': 'off',
    },
  },

  // Frontend React files override (no-unused-vars disabled for JSX)
  {
    files: ['frontend/**', 'frontend/src/**', 'src/**'],
    plugins: { react: reactPlugin },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
    },
  },
];
