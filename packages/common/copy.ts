import * as path from 'path'
import * as util from 'util'
import * as fs from 'fs'

import { globFiles, mkdirp } from 'aria-fs';

const copyFile = util.promisify(fs.copyFile)
const writeFile = util.promisify(fs.writeFile)

export async function copyBinFiles() {
  const { resolve, dirname } = path
  const files = await globFiles('bin/**/*')
  return Promise.all(files.map(file => {
    const destFile = file.replace(resolve(), 'dist') 
    mkdirp(dirname(destFile))
    return copyFile(file, destFile)
  }))
}

export async function copyPackageJson() {
  const { resolve, join } = path
  const pkg = require(resolve('package.json'));
  pkg.paths.test = '../test/test'
  delete pkg.scripts;
  delete pkg.devDependencies;
  return writeFile(join('dist', 'package.json'), JSON.stringify(pkg, null, 2))
}

export async function copyReadme() {
  const { resolve, join } = path, README = 'README.md'
  return copyFile(resolve(README), resolve(join('dist', README)))
}