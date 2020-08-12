import { validatePluginOptions } from './validatePluginOptions';
import { IOptions } from './model';

/* -----------------------------------
 *
 * ICreate
 *
 * -------------------------------- */

interface ICreate {
  stage: string;
  getConfig(): any;
  actions: {
    replaceWebpackConfig(config: any): void;
  };
}

/* -----------------------------------
 *
 * onCreate
 *
 * -------------------------------- */

export function onCreateWebpackConfig(
  { stage, getConfig, actions }: ICreate,
  options: IOptions
) {
  validatePluginOptions(options);

  if (stage === 'build-javascript') {
    const config = getConfig();

    config.entry = { ...config.entry, ...options.entry };

    actions.replaceWebpackConfig(config);
  }
}
