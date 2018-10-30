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
    '^Game/(.*)$': '<rootDir>/src/Game/$1',
    '^PageServer/(.*)$': '<rootDir>/src/PageServer/$1',
    '^SessionServer/(.*)$': '<rootDir>/src/SessionServer/$1'
  },
  "setupTestFrameworkScriptFile": "jest-extended"
}