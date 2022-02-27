import defaultRollup from '@donmahallem/rollup-config';
import pkg from './package.json';
const copyFile = (options = {}) => {
    return {
        name: 'copy-file',
        generateBundle(outputOptions, bundle, isWrite) {
            for (const key of Object.keys(bundle)) {
                if (bundle[key].isEntry === true) {
                    bundle[key].code = '#!/usr/bin/env node\n' + bundle[key].code
                }
            }
        },
    }
}
const cfg = defaultRollup(pkg);
cfg.plugins.push(copyFile());
export default Object.assign(cfg);
