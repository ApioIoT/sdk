import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'semi': [2, 'never'],
      'comma-dangle': ['error', 'never'],
      'quotes': [2, 'single', { 'avoidEscape': true }]
    }
  }
]