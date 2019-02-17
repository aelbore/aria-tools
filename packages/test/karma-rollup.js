
const { rollup } = require('rollup');

function createPreprocessor(preconfig, config, emitter, logger) {
  const cache = new Map();

  return async function preprocess(original, file, done) {
    try {
      const options = Object.assign(
        {},
        config.rollupPreprocessor,
        preconfig.options,
        {
          input: file.path,
          cache: cache.get(file.path)
        }
      );

      const bundle = await rollup(options);
      cache.set(file.path, bundle.cache);

      const { output } = await bundle.generate(options);

      for (const result of output) {
        if (!result.isAsset) {
          const { code, map } = result;
          const { sourcemap } = options.output;

          file.sourceMap = map;

          const processed =
            sourcemap === "inline"
              ? code + `\n//# sourceMappingURL=${map.toUrl()}\n`
              : code;

          file.path = file.path.replace('.ts', '.js')

          return done(null, processed);
        }
      }
      done(null, original);
    } catch (error) {
      done(error, null);
    }
  };
}

createPreprocessor.$inject = ["args", "config", "emitter", "logger"];

module.exports = { "preprocessor:rollup": ["factory", createPreprocessor] }