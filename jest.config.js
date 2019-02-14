module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/app.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    // '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    // '.*\\.(scss)$': '<rootDir>/node_modules/jest-css-modules',
    // '.*\\.(scss)$': 'jest-css-modules',
    // '\\.(scss|sass)$': '<rootDir>/internals/mocks/styleMock.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
    // 'scriptPreprocessor': '<rootDir>/node_modules/jest-css-modules',
    // '.+\\.(css|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  setupFiles: ['raf/polyfill', '<rootDir>/internals/testing/enzyme-setup.js'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
