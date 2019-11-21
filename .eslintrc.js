module.exports = {
  root: true,
  env: {
    browser: false,
    node: false
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
     "quotes": [2, "double", { "avoidEscape": true }],
  }
}
