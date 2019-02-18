import * as path from 'path'
import * as util from 'util'
import * as fs from 'fs'

const copyFile = util.promisify(fs.copyFile)

export async function copyReadme() {
  const { resolve, join } = path, README = 'README.md'
  return copyFile(resolve(README), resolve(join('dist', README)))
}