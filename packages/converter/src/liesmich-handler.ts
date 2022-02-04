/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { Context } from 'mdast-util-to-markdown/lib/types';
import { safe } from 'mdast-util-to-markdown/lib/util/safe';
import { Literal } from 'unist';

/**
 * @type {Handle}
 * @param {Text} node
 */
export function text(node: Literal<string>, _, context: Context, safeOptions: Parameters<typeof safe>[2]) {
    return safe(context, node.value, safeOptions);
}
