module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: ["eslint:recommended", "plugin:node/recommended"],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    "no-undef": "error",
    "no-unused-vars": "error",
    "array-element-newline": "off",
    quotes: ["error", "double"],
    "no-process-exit": "off",
    "no-console": ["error", { allow: ["warn", "error", "log"] }]
  }
};
