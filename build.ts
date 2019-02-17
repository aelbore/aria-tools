const path = require('path')
const fs = require('fs')

const { promisify } = require('util')
const { clean, mkdirp, globFiles } = require('aria-fs')
const { rollup } = require('rollup')

const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)

const DIST_PATH = path.join('dist', 'test')
const ENTRY_FILE = 'packages/test/index.ts'

const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: ENTRY_FILE,
    external: [
      'path'
    ],
    plugins: [
      typescript2({
        tsconfigDefaults: { 
          compilerOptions: { 
            target: 'es2015', 
            module: 'esNext', 
            moduleResolution: 'node',
            lib: [ "dom", "es2015", "es2017" ]
          }
        },
        check: false,
        cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
        useTsconfigDeclarationDir: true
      }),         
      resolve(),
    ]
  },
  outputOptions: {
    sourcemap: false,
    file: path.join(DIST_PATH, 'test.js'),
    format: 'cjs'
  } 
}

async function rollupBuild({ inputOptions, outputOptions }) {
  return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}

async function copyBinFiles() {
  const files = await globFiles('bin/**/*')
  return Promise.all(files.map(file => {
    const destFile = file.replace(path.resolve(), 'dist') 
    mkdirp(path.dirname(destFile))
    return copyFile(file, destFile)
  }))
}

async function copyKarmaRollup() {
  const KARMA_ROLLUP_PREPROCESSOR = path.join('packages', 'test', 'karma-rollup.js')
  return copyFile(
    KARMA_ROLLUP_PREPROCESSOR, 
    path.join('dist', 'test', 'karma-rollup.js')
  ) 
}

async function copyPackageJson() {
  const pkg = require('./package.json');
  pkg.paths.test = '../test/test'
  delete pkg.scripts;
  delete pkg.devDependencies;
  return writeFile(path.join('dist', 'package.json'), JSON.stringify(pkg, null, 2))
}

clean('dist')
  .then(() => rollupBuild(rollupConfig))
  .then(() => Promise.all([ copyPackageJson(), copyKarmaRollup(), copyBinFiles() ]))
