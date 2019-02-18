const path = require('path')
const fs = require('fs')

const { promisify } = require('util')
const { clean }= require('aria-fs')

const { ROLLUP_TYPESCRIPT_OPTIONS, typescript2, resolve } = require('./packages/test/utils')
const { rollupBuild, copyBinFiles, copyPackageJson, copyReadme } = require('./packages/common/index')

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
      typescript2({ ...ROLLUP_TYPESCRIPT_OPTIONS }),         
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
