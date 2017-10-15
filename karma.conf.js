module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
    reporters: ['mocha'],
    files: [
      'src/**/*.ts',
      'test/**/*.test.ts',
    ],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript"],
      "test/**/*.ts": ["karma-typescript"],
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
    },
  });
}