import type { Config } from "@jest/types";
const config: Config.InitialOptions = {
  verbose: true,
  collectCoverageFrom: [
    "src/components/**/*.{js,jsx,ts,tsx}",
  ],
  coveragePathIgnorePatterns: [".d.ts", ".stories.jsx", ".*[tT]ypes.ts$"],
  coverageReporters: ["lcov"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  resetMocks: true,
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transformIgnorePatterns: ["/node_modules/(?!@nxg-web)"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/assetsTransformer.js",
    "\\.(css|less)$": "<rootDir>/assetsTransformer.js",
  },
};
export default config;
