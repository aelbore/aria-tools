import * as path from 'path'
import * as fs from 'fs'

import { promisify } from 'util'
import { clean } from 'aria-fs'

import { ROLLUP_TYPSCRIPT_OPTIONS, typescript2, resolve } from './packages/test/utils'
import { rollupBuild, copyBinFiles, copyPackageJson, copyReadme } from './packages/common';

const copyFile = promisify(fs.copyFile)

const DIST_PATH = path.join('dist', 'test')
const TEST_PACKAGE = path.join('packages', 'test')

const ENTRY_FILE = path.join(TEST_PACKAGE, 'index.ts')

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: ENTRY_FILE,
    external: [
      'path',
      'rollup',
      'rollup-plugin-istanbul',
      'rollup-plugin-typescript2',
      'rollup-plugin-node-resolve'
    ],
    plugins: [
      typescript2({ ...ROLLUP_TYPSCRIPT_OPTIONS }),         
      resolve()
    ]
  },
  outputOptions: {
    sourcemap: false,
    file: path.join(DIST_PATH, 'test.js'),
    format: 'cjs'
  } 
}

async function copyKarmaRollup() {
  const { join } = path, FILE_NAME = 'karma-rollup.js'
  return copyFile(join(TEST_PACKAGE, FILE_NAME), join(DIST_PATH, FILE_NAME)) 
}

clean('dist')
  .then(() => rollupBuild(rollupConfig))
  .then(() => Promise.all([ copyPackageJson(), copyKarmaRollup(), copyBinFiles(), copyReadme() ]))
