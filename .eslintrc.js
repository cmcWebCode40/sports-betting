module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  // Airbnb's ESLint config requires this
  parserOptions: {
    // project: './tsconfig.json',
  },
  rules: {
    // Include .prettierrc.js rules
    // 'prettier/prettier': ['warn', { singleQuote: true }, { usePrettierrc: false }],
    "prettier/prettier": "warn",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    // We will use TypeScript's types for component props instead
    "react/prop-types": "off",
    // We don't want unused vars
    "react/display-name": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "warn",
    "no-plusplus": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-param-reassign": ["error", { props: false }],
  },
};
