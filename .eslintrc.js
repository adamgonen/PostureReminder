module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  globals: {
    chrome: true,
  },
};
