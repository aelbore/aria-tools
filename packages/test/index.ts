import { karmaConfig } from './configs'
import { PLUGINS } from './plugins'

export * from './serve'

export const configs = (specFiles) => karmaConfig({ 
  specFiles,
  frameworks: [ 'jasmine', 'mocha', 'chai' ],
  plugins: PLUGINS.plugins
})