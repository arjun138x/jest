import type { Config } from "@jest/types";

const baseDir = "<rootDir>/src/app/doubles";
const baseTestDir = "<rootDir>/src/test/doubles";

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
  testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;
