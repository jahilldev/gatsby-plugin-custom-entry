import { IOptions } from '../model';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validatePluginOptions(
  pluginOptions: Partial<IOptions>
): pluginOptions is IOptions {
  if (!pluginOptions.entry) {
    throw new Error('gatsby-plugin-custom-entry: Missing required option "entry".');
  }

  return true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { validatePluginOptions };
