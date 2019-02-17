import * as path from 'path'
import * as karma from 'karma'

const server = new karma.Server({  
  configFile: path.join(__dirname, 'karma.config.ts'),
  singleRun: true
})
server.start()