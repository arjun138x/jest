import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src";
const baseTestDir = "<rootDir>/test/01_integration_testing";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node", // this helps for debugging the jest
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    // "<rootDir>/src/app/**/*.ts" // to run all test files
    `${baseDir}/**/*.ts`, // to run one folder
  ],
  // to run one test folder
  testMatch: [`${baseTestDir}/**/*test.ts`],
};

export default config;
