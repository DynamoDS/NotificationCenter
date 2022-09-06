/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  projects: [
    {
      displayName: 'Lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.js', '<rootDir>/tests/**/*.test.js'],
    },
    {
      displayName: 'Unit Tests',
      testMatch: ['<rootDir>/tests/unit/*.test.js'],
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif)$': '<rootDir>/tests/unit/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/tests/unit/__mocks__/styleMock.js',
      },
    },
    {
      displayName: 'E2E Tests',
      testMatch: ['<rootDir>/tests/e2e/*.test.js'],
      preset: 'jest-puppeteer',
    },
  ],
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
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coverageDirectory: '<rootDir>/reports/coverage',
};
