import type { Config } from "@jest/types";
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node", // this helps for debugging the jest
  verbose: true,
};

export default config;
