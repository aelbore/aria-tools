import * as path from 'path'

import { bundle, TSRollupConfig, clean, copyFiles } from 'aria-build'

(async function() {
  const copyOptions = [
    { src: 'bin/aria.js', dest: path.join('dist', 'bin') },
    { src: 'packages/test/karma-rollup.js', dest: 'dist' }
  ]

  const pkg = require('./package.json')

  const options: TSRollupConfig = {
    input: './packages/test/index.ts',
    external: [
      'http',
      ...Object.keys(pkg.dependencies)
    ],
    output: {
      file: './dist/test/test.js',
      format: 'cjs'
    }
  }

  await clean('dist')
  await bundle(options)
  await Promise.all(copyOptions.map(option => {
    return copyFiles(option.src, option.dest)
  }))
})()