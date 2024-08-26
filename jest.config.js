const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleNameMapper: pathsToModuleNameMapper({}, { prefix: '<rootDir>/src' }),
  maxConcurrency: 4,
};
