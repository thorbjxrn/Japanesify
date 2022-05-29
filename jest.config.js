module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    testEnvironment: 'jsdom',
    testRegex: ".*\\.test\\.(ts|tsx)$",
    setupFiles: ['./test/jest.setup.ts'],
  };