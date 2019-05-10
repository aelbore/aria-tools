import * as path from 'path'
import * as fs from 'fs'

import { createTSConfig, commonjs, onwarn, typescript2, nodeResolve  } from 'aria-build'
import { transformer } from './transformer';

const istanbul = require('rollup-plugin-istanbul');

const ARIA_CONFIG_PATH = path.resolve('.aria.config.js')

let rollupPlugins = []
if (fs.existsSync(ARIA_CONFIG_PATH)) {
  const ariaConfig = require(ARIA_CONFIG_PATH)
  if (ariaConfig && ariaConfig.rollupPlugins && Array.isArray(ariaConfig.rollupPlugins)) {
    rollupPlugins = [ 
      ...ariaConfig.rollupPlugins 
    ]
  }
}

export const DEFAULT_SPEC_FILES = 'src/**/*.spec.ts'

export const COVERAGE_DEST = path.resolve('node_modules/.tmp/coverage')

export interface KarmaConfigOptions {
  specFiles: string;
  frameworks?: Array<string>;
  plugins?: Array<string>;
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
            typescript2(createTSConfig({ 
              tsconfig: {
                transformers: [ transformer() ]
              }
            })),
            istanbul({ exclude: [ specFiles, "node_modules/**/*" ] }),      
            nodeResolve(),
            commonjs()
          ],
          onwarn,
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