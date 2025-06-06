/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // enables eslint-config-prettier and eslint-plugin-prettier
  ],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["dist/", "node_modules/"],
};
