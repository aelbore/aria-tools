import * as path from 'path'

const istanbul = require('rollup-plugin-istanbul');
const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

const DEFAULT_SPEC_FILES = 'src/**/*.spec.ts'

export { istanbul, typescript2, resolve }

export const SPEC_FILES = process.env.KARMA_FILES 
  ? path.resolve(process.env.KARMA_FILES)
  : path.resolve(DEFAULT_SPEC_FILES)

export const COVERAGE_DEST = path.resolve('node_modules/.tmp/coverage')

export const ROLLUP_TYPESCRIPT_OPTIONS = {
  tsconfigDefaults: { 
    compilerOptions: {
      "baseUrl": ".",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "target": "es2015", 
      "module": "es2015", 
      "moduleResolution": "node",           
      "lib": [ 
        "dom", 
        "es2015", 
        "es2017"  
      ]       
    }
  },
  check: false,
  cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
  useTsconfigDeclarationDir: true
}