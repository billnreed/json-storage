module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
    reporters: ['mocha'],
    files: [
      'test/**/*.test.ts',
    ],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript"],
      "test/**/*.ts": ["karma-typescript"],
    }
  });
}