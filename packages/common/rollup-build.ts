import { rollup } from 'rollup';

export async function rollupBuild({ inputOptions, outputOptions }) {
  return rollup(inputOptions).then(bundle => bundle.write(outputOptions));
}