import { rollupPreprocessors } from "./rollup-typescript";

export const CUSTOM_PREPROCESSORS = {
  customPreprocessors: {
    ...rollupPreprocessors
  },
}