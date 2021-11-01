import defaultRollup from '@donmahallem/rollup-config';
import pkg from './package.json';

export default Object.assign(defaultRollup(pkg), { external: ["vfile", "spark-md5", "gray-matter"] });
