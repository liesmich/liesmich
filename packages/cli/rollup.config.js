import defaultRollup from '@donmahallem/rollup-config';
import shebang from '@donmahallem/rollup-plugin-shebang';
import pkg from './package.json';

const cfg = defaultRollup(pkg);
cfg.plugins.push(shebang());
export default Object.assign(cfg);
