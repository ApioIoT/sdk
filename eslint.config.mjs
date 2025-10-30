import globals from 'globals'
import tseslint from 'typescript-eslint'


export default [
  {files: ['**/*.ts']},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  {
    rules: {
      'semi': [2, 'never'],
      'comma-dangle': ['error', 'never'],
      'quotes': [2, 'single', { 'avoidEscape': true }],
       '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]