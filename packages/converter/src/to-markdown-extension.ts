/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { Handle, SafeOptions, Context, Options } from 'mdast-util-to-markdown';
import { Literal, Parent } from 'unist';
import { Constants } from './constants';

const variableHandler: Handle = function variableHandler(
    node: Literal<string>,
    parent: Parent | null | undefined,
    ctx: Context,
    opts: SafeOptions
): string {
    return node.value;
};
export const toMarkdown: Options = {
    handlers: {
        [Constants.LIESMICH]: variableHandler,
    },
};
