module.exports = {
    "preset": 'ts-jest',
    "roots": ["./src"],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "\\.js$": "babel-jest"
    },
    "bail": true,
    "clearMocks": true,
    "collectCoverage": false,
    "verbose": true,
    "testEnvironment": "node",
    "testTimeout": 600000
}