module.exports = {
  extends: ["react-app", "react-app/jest", 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    "testing-library/no-unnecessary-act": "off",
  },
}