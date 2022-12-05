export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['src/', 'test/'],
  setupFiles: ['./test/jest.setup.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}
