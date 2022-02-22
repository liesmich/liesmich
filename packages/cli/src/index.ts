/*
 * Package @liesmich/cli
 * Source https://liesmich.github.io/liesmich/
 */

import { unified } from "unified";
import { args } from "unified-args";

args({
    processor: unified,
    name: 'liesmich',
    description: 'liesmich readme generator',
    version: '__BUILD_VERSION__',
    pluginPrefix: 'remark',
    extensions: ['remark-gfm',
        'remark-parse',
        'remark-stringify',
        '@liesmich/converter'
    ],
    packageField: 'liesmich',
    rcName: '.liesmichrc',
    ignoreName: '.liesmichignore'
})
