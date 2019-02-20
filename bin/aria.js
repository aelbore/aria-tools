#!/usr/bin/env node

const path = require('path')

const program = require('commander')
const pkg = require('../package.json')

const COMMAND = Object.freeze({
  TEST: 'test',
  SERVE: 'serve'
})

program
  .version(pkg.version)
  .arguments('[command] [dir]')
  .option('-nr, --no-recursive [value]', 'recursively get the files.')
  .option('-ext, --extname [extname]', 'extension file of the specs.')
  .option('-tc, --test-coverage', 'serve coverage html output.')
  .action(function (command, dir, options) {
    if (command) {
      switch (command) {
        case COMMAND.TEST:
          const testParams = {
            dir: dir ? dir: 'src',
            recursive: '**',
            extname: '.spec.ts'
          }
          if (options.extname && !(typeof options.extname == "boolean")) {
            testParams.extname = options.extname;
          }
          if (!(options.recursive)) {
            testParams.recursive = '';
          }
          process.env.KARMA_FILES = path.join(
            testParams.dir, testParams.recursive, `*${testParams.extname}`
          )
          const Server = require('karma').Server
          const { configs } = require(pkg.paths.test)
          const server = new Server({ ...configs(process.env.KARMA_FILES) }) 
          server.start()
        break;
        case COMMAND.SERVE: 
          if (options.testCoverage) {
            require(pkg.paths.test).serveCoverage()
          }
        break;
      }
    }
  });
 
program.parse(process.argv);