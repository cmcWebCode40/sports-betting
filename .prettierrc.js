module.exports = process.env.REACT_APP_DEV_DISABLE_ESLINT
  ? {}
  : {
      semi: true,
      trailingComma: 'all',
      singleQuote: true,
      printWidth: 100,
      tabWidth: 2,
    };
