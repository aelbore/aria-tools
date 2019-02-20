(async function() {
  const { resolve, join } = require('path')
  const { existsSync } = require('fs')
  const { symlinkDir } = require('aria-fs')

  const NODE_MODULES = resolve(join(__dirname, 'node_modules'))
  if (!(existsSync(NODE_MODULES))) {
    await symlinkDir(resolve('../'), NODE_MODULES)
  } 
})()