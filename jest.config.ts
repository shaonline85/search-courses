import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: { 
    '^@/(.*)$': '<rootDir>/$1', 
  },
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  
};

export default createJestConfig(config);