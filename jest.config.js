module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ["<rootDir>/jest.setup.js"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/",
    "_auth_"
  ]
};
