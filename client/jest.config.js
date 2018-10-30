module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "moduleNameMapper": {
    '^util/(.*)$': '<rootDir>/src/util/$1',
    '^game/(.*)$': '<rootDir>/src/game/$1',
    '^server/(.*)$': '<rootDir>/src/server/$1'
  },
  "setupFiles": ["jest-canvas-mock"],
  "setupTestFrameworkScriptFile": "jest-extended"
}