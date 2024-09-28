/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true, // Enable ESM support in ts-jest
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ES modules
  moduleNameMapper: {
    // Map ESM-style imports with .js extension to .ts files
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"], // Recognize these extensions
  testEnvironment: "node", // Use Node.js as the test environment
  testMatch: ["**/*.spec.ts"], // Ensure Jest runs tests for TypeScript files
  setupFilesAfterEnv: ["./tests/jest.setup.ts"],
};
export default config;
