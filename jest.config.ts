export default {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  rootDir: 'src/',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
