module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
    reporters: ['mocha'],
    files: [
      'src/**/*.ts',
      'test/**/*.test.ts',
      'lib/index.ts',
    ],
    preprocessors: {
      "lib/index.ts": ["karma-typescript"],
      "src/**/*.ts": ["karma-typescript"],
      "test/**/*.ts": ["karma-typescript"],
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
    },
  });
}