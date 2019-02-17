import * as path from 'path'
import { SPEC_FILES } from './utils'

const istanbul = require('rollup-plugin-istanbul');
const typescript2 = require('rollup-plugin-typescript2');
const resolve = require('rollup-plugin-node-resolve');

const rollupTypescriptConfig = {
  tsconfigDefaults: {
    "compilerOptions": {
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
    },
    "include": [
      SPEC_FILES
    ]
  },
  check: false,
  cacheRoot: path.join(path.resolve(), 'node_modules/.tmp/.rts2_cache'), 
  useTsconfigDeclarationDir: true
}

const istanbulConfig = {
  exclude: [ SPEC_FILES, "node_modules/**/*" ]
}

export const rollupPreprocessors = {
  rollupNode: {
    base: 'rollup',
    options: {
      plugins: [
        typescript2(rollupTypescriptConfig),
        istanbul(istanbulConfig),      
        resolve()
      ],
      output: {
        format: "iife", 
        sourcemap: 'inline'
      }
    }
  }
}
