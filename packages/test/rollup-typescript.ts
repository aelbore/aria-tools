import { SPEC_FILES, ROLLUP_TYPSCRIPT_OPTIONS, istanbul, typescript2, resolve } from './utils'

const istanbulConfig = {
  exclude: [ SPEC_FILES, "node_modules/**/*" ]
}

export const rollupPreprocessors = {
  rollupNode: {
    base: 'rollup',
    options: {
      plugins: [
        typescript2({ ...ROLLUP_TYPSCRIPT_OPTIONS }),
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
