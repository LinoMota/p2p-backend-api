export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  rootDir: 'test',
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
