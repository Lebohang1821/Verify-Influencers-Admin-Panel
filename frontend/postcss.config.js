module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true
      }
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
