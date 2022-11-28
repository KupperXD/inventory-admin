require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
    plugins: [
        'prettier'
    ],
  // add your custom rules here
  rules: {
      '@typescript-eslint/no-namespace': 'off',
      'quotes': [
          'error',
          'single',
          { 'avoidEscape': false, 'allowTemplateLiterals': true }
      ],
      'prettier/prettier': [
          'warn',
          {
              singleQuote: true,
              semi: true,
          }
      ],
  },
}
