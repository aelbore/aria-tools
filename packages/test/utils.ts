import * as path from 'path'

export const SPEC_FILES = process.env.KARMA_FILES 
  ? path.resolve(process.env.KARMA_FILES)
  : path.resolve('src/**/*.spec.ts')
export const COVERAGE_DEST = path.resolve('node_modules/.tmp/coverage');