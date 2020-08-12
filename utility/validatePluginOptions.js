"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePluginOptions = void 0;
/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */
function validatePluginOptions(pluginOptions) {
    if (!pluginOptions.entry) {
        throw new Error('gatsby-plugin-custom-entry: Missing required option "entry".');
    }
    return true;
}
exports.validatePluginOptions = validatePluginOptions;
//# sourceMappingURL=validatePluginOptions.js.map