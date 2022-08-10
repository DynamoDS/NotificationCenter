/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom:  ['src/**/*.{js,jsx}'],
  coverageDirectory: '<rootDir>/reports/coverage',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'report.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
  ],
};
