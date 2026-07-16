import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  { ignores: ['dist', '.next', 'node_modules'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      // Reglas adicionales para limpiar código
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-trailing-spaces': 'error', // Elimina espacios al final de líneas
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }], // Limita líneas vacías
      'eol-last': ['error', 'always'], // Asegura línea vacía al final del archivo
      'semi': ['error', 'always'], // Punto y coma obligatorio
      'quotes': ['error', 'single', { avoidEscape: true }], // Comillas simples
    },
  },
];