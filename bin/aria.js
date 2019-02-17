#!/usr/bin/env node

const path = require('path')

const program = require('commander')
const pkg = require('../package.json')

const Server = require('karma').Server

// >> aria test demo --no-recursive --extname .test.ts
// >> aria serve --test-coverage --open

program
  .version(pkg.version)
  .arguments('[command] [dir]')
  .option('-nr, --no-recursive [value]', 'recursively get the files.')
  .option('-ext, --extname [extname]', 'extension file of the specs.')
  .option('-tc, --test-coverage', 'serve coverage html output.')
  .action(function (command, dir, options) {
    if (command) {
      switch (command) {
        case 'rmdir':
          if (dir) {
            const { clean } = require('aria-fs');
            clean(dir)
          }
        case 'mkdir':
          if (dir) {
            const { mkdirp } = require('aria-fs');
            mkdirp(dir)
          }
          break;
        break;
        case 'test':
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
          const { configs, PLUGINS, CUSTOM_PREPROCESSORS } = require(pkg.paths.test)
          const server = new Server({ 
            ...configs, ...PLUGINS, ...CUSTOM_PREPROCESSORS, singleRun: true 
          }) 
          server.start()
        break;
        case 'serve': 
          if (options.testCoverage) {
            require('../packages/test/serve')
          }
        break;
      }
    }
  });
 
program.parse(process.argv);