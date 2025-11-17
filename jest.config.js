module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^.+\\.(css)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/components/index.ts'
  ],
  coveragePathIgnorePatterns: ['/src/.*\\.stories\\.tsx$', '/src/components/index\\.ts$'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};