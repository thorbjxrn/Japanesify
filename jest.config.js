module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    testEnvironment: 'jsdom',
    setupFiles: ['./test/jest.setup.ts'],
  };