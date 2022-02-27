/*
 * Package @liesmich/cli
 * Source https://liesmich.github.io/liesmich/
 */

import { unified } from 'unified';
import { args } from 'unified-args';

args({
    description: 'liesmich readme generator',
    extensions: ['remark-gfm', 'remark-parse', 'remark-stringify', '@liesmich/converter'],
    ignoreName: '.liesmichignore',
    name: 'liesmich',
    packageField: 'liesmich',
    pluginPrefix: 'remark',
    processor: unified,
    rcName: '.liesmichrc',
    version: '__BUILD_VERSION__',
});
