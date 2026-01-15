import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // =========================
  // Global ignores
  // =========================
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      'dist/**',
      '*.config.js',
      '*.config.mjs',
      'eslint.config.mjs',
      'postcss.config.mjs',
      'ecosystem.config.js',
    ],
  },

  // =========================
  // Base JS rules (JS / MJS)
  // =========================
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // =========================
  // Next.js + TS + Prettier
  // (spread FIRST, no extends)
  // =========================
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier'
  ).map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  // =========================
  // TypeScript rules
  // =========================
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
    },
    rules: {
      // Disable base rule
      'no-unused-vars': 'off',

      // TS unused vars (WORKING)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^React$|^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // Hooks
      ...reactHooks.configs.recommended.rules,
    },
  },
];
