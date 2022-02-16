module.exports = {
  moduleNameMapper: {
    '^@/(.*)$':  '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1'
  },
  testEnvironment: 'jsdom'
};
