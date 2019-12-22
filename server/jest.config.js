const merge = require("merge");
const tsPreset = require("ts-jest/jest-preset");
const mongoPreset = require("@shelf/jest-mongodb/jest-preset");

module.exports = {
  ...tsPreset,
  ...mongoPreset,
  setupFiles: ["jest-localstorage-mock"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleFileExtensions: ["js", "jsx", "json", "node"]
};
