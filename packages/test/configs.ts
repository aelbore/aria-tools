import * as path from 'path'
import * as fs from 'fs'
import { transformer } from './transformer';

const istanbul = require('rollup-plugin-istanbul');
const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs')

const ARIA_CONFIG_PATH = path.resolve('.aria.config.js')

let rollupPlugins = []
if (fs.existsSync(ARIA_CONFIG_PATH)) {
  const ariaConfig = require(ARIA_CONFIG_PATH)
  if (ariaConfig && ariaConfig.rollupPlugins && Array.isArray(ariaConfig.rollupPlugins)) {
    rollupPlugins = [ ...ariaConfig.rollupPlugins ]
  }
}

export const DEFAULT_SPEC_FILES = 'src/**/*.spec.ts'

export const COVERAGE_DEST = path.resolve('node_modules/.tmp/coverage')

export interface KarmaConfigOptions {
  specFiles: string;
  frameworks?: Array<string>;
  plugins?: Array<string>;
}

export const ROLLUP_TYPESCRIPT_OPTIONS = {
  transformers: [ 
    () => ({
      before: [ transformer() ],
      after: []
    })
  ],
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
      ],
      "typeRoots": [ "node_modules/@types" ]  
    }
  },
  check: false,
  cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
  useTsconfigDeclarationDir: true
}

export function karmaConfig(options: KarmaConfigOptions) {
  const { frameworks, specFiles, plugins } = options;

  const testFiles = specFiles.replace('.spec.ts', '.test.ts')

  const configs = {
    files: [
      "node_modules/@webcomponents/custom-elements/src/native-shim.js",
      { pattern: specFiles }
    ],

    frameworks: [ ...frameworks ],

    plugins: plugins.map(plugin => require(plugin)),

    preprocessors: {
      [specFiles]: [ 'rollupNode' ],
      [testFiles]: [ 'rollupNode' ]
    },

    customPreprocessors: {
      rollupNode: {
        base: 'rollup',
        options: {
          plugins: [
            ...rollupPlugins,
            typescript2({ ...ROLLUP_TYPESCRIPT_OPTIONS  }),
            istanbul({ exclude: [ specFiles, "node_modules/**/*" ] }),      
            resolve(),
            commonjs()
          ],
          onwarn (warning) {
            if (warning.code === 'THIS_IS_UNDEFINED') { return; }
            console.log("Rollup warning: ", warning.message);
          },
          output: {
            format: "iife", 
            sourcemap: false
          }
        }
      }
    },

    reporters: [ 'mocha', 'coverage-istanbul' ],

    browsers: ['ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    coverageIstanbulReporter: {
      reports: [ 'lcov', 'text-summary' ],
      dir: COVERAGE_DEST,
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        global: {
          statements: 70,
          branches: 70,
          functions: 70,
          lines: 70,
        }
      }
    },

    mime: {
      "text/x-typescript": ["ts"]
    },

    singleRun: true,
    concurrency: Infinity
  }

  return {
    ...configs
  }
}