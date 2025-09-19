module.exports = {
  env: {
    "react-native/react-native": true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react", "react-native", "prettier"],
  rules: {
    // Enforce double quotes
    quotes: ["error", "double", { avoidEscape: true }],

    // Enforce no semicolons
    semi: ["error", "never"],

    // React specific rules
    "react/react-in-jsx-scope": "off", // Not needed in React 17+
    "react/prop-types": "off", // Using TypeScript for prop validation

    // React Native specific adjustments
    "react-native/no-unused-styles": "error",
    "react-native/split-platform-components": "error",
    "react-native/no-inline-styles": "warn",

    // Prettier integration
    "prettier/prettier": [
      "error",
      {
        semi: false,
        singleQuote: false,
        trailingComma: "es5",
      },
    ],

    // TypeScript adjustments
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
