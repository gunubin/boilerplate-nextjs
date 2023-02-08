const appConfig = require('./jest/logics.config');

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'json', 'node'],
  moduleNameMapper: {
    // 静的な画像などのアセットをモックする
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/requireFileMock.js',
    '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/adapters/(.*)$': '<rootDir>/src/adapters/$1',
    // 'assets/images/(.*)': ['<rootDir>/assets/images/$1'],
  },
  coverageDirectory: '<rootDir>/coverage/logics',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/reports',
        outputName: 'coverage-logics.xml',
      },
    ],
  ],
  projects: [
    {
      displayName: '@app',
      rootDir: '<rootDir>',
      ...appConfig,
    },
  ],
};
