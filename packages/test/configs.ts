import { SPEC_FILES, COVERAGE_DEST } from './utils';
import { rollupPreprocessors } from './rollup-typescript';

export const configs = { 
  frameworks: [ 'jasmine' ],

  preprocessors: {
    [SPEC_FILES]: [ ...Object.keys(rollupPreprocessors) ]
  },

  files: [
    { pattern: SPEC_FILES }
  ],

  coverageIstanbulReporter: {
    reports: [ 'lcov', 'text-summary' ],
    dir: COVERAGE_DEST
  },

  reporters: [ 'mocha', 'coverage-istanbul' ],

  browsers: ['ChromeHeadlessNoSandbox'],

  customLaunchers: {
    ChromeHeadlessNoSandbox: {
      base: 'ChromeHeadless',
      flags: ['--no-sandbox']
    }
  },

  mime: {
    "text/x-typescript": ["ts"]
  }

}