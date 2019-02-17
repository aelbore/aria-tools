import { configs } from './configs';
import { PLUGINS } from './plugins';
import { CUSTOM_PREPROCESSORS } from './custom-preprocessors';

export default function karmaConfig(config)  {
  config.set({
    ...configs,
    ...PLUGINS,
    ...CUSTOM_PREPROCESSORS
  })
}