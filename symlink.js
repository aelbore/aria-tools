(async function() {
  const { join, resolve } = require('path')
  const { existsSync } = require('fs')
  const { symlinkDir } = require('aria-fs')

  const NODE_MODULES = join(__dirname, 'node_modules')
  if (!(existsSync(NODE_MODULES))) {
    await symlinkDir(resolve('../node_modules'), NODE_MODULES)
  }
})()