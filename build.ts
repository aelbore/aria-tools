const fs = require('fs')

const { promisify } = require('util')
const { join, resolve, dirname } = require('path')

const { clean, globFiles, mkdirp } = require('aria-fs')
const { rollup } = require('rollup')

const typescript2 = require('rollup-plugin-typescript2')
const nodeResolve = require('rollup-plugin-node-resolve')

const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)

const DIST_PATH = join('dist', 'test')
const TEST_PACKAGE = join('packages', 'test')

const ENTRY_FILE = join(TEST_PACKAGE, 'index.ts')

const rollupConfig = {
  inputOptions: {
    treeshake: true,
    input: ENTRY_FILE,
    external: [
      'path',
      'fs',
      'http',
      'rollup',
      'rollup-plugin-istanbul',
      'rollup-plugin-typescript2',
      'rollup-plugin-node-resolve'
    ],
    plugins: [
      typescript2({
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
        cacheRoot: join(resolve(), 'node_modules/.tmp/.rts2_cache'), 
        useTsconfigDeclarationDir: true
      }),         
      nodeResolve()
    ]
  },
  outputOptions: {
    sourcemap: false,
    file: join(DIST_PATH, 'test.js'),
    format: 'cjs'
  } 
}

async function copyBinFiles() {
  const files = await globFiles('bin/**/*')
  return Promise.all(files.map(file => {
    const destFile = file.replace(resolve(), 'dist') 
    mkdirp(dirname(destFile))
    return copyFile(file, destFile)
  }))
}

async function copyPackageJson() {
  const pkg = require('./package.json');
  pkg.paths.test = '../test/test'
  delete pkg.scripts;
  delete pkg.devDependencies;
  return writeFile(join('dist', 'package.json'), JSON.stringify(pkg, null, 2))
}

 async function copyReadme() {
  const README = 'README.md'
  return copyFile(resolve(README), resolve(join('dist', README)))
}

async function copyKarmaRollup() {
  const FILE_NAME = 'karma-rollup.js'
  return copyFile(join(TEST_PACKAGE, FILE_NAME), join(DIST_PATH, FILE_NAME)) 
}

async function rollupBuild({ inputOptions, outputOptions }) {
  return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}

clean('dist')
  .then(() => rollupBuild(rollupConfig))
  .then(() => Promise.all([ copyPackageJson(), copyKarmaRollup(), copyBinFiles(), copyReadme() ]))
