/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { Extension, Token } from 'mdast-util-from-markdown';
import { CompileContext } from 'mdast-util-from-markdown/lib';
import { parse as qsParse } from 'qs';
import { Node } from 'unist';

const getParent = (stack: CompileContext['stack']): Node => {
    return stack[stack.length - 1];
};
const setKey = <V = unknown>(node: Node, key: string, value: V): void => {
    if (node.data == undefined) {
        node.data = {};
    }
    node.data[key] = value;
};
export const fromMarkdown: Extension = {
    enter: {
        liesmich: function (token) {
            this.enter(
                {
                    data: {},
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    type: 'liesmich' as any,
                    value: this.sliceSerialize(token),
                },
                token
            );
        },
        liesmichScheme: function (token) {
            const parent: Node = getParent(this.stack);
            if (parent.type === 'liesmich') {
                setKey(parent, 'scheme', this.sliceSerialize(token));
            }
        },
        liesmichString: function (token: Token) {
            this.setData('k', 'n');
            const parent: Node = getParent(this.stack);
            if (parent.type === 'liesmich') {
                const serialized: string = this.sliceSerialize(token);
                const queryIndex: number = serialized.indexOf('?');
                if (queryIndex >= 0) {
                    setKey(parent, 'query', qsParse(serialized.substring(queryIndex + 1)));
                    setKey(parent, 'host', serialized.substring(0, queryIndex));
                } else {
                    setKey(parent, 'host', serialized);
                }
            }
        },
    },
    exit: {
        liesmich: function exitFootnoteDefinition(token) {
            //  console.log('exit', token, this.getData('k'));
            this.exit(token);
        },
        liesmichScheme: function exitFootnoteDefinition(token) {
            // console.log('exit', token, this.getData('k'));
        },
        liesmichString: function exitFootnoteDefinition(token) {
            // console.log('exit', token);
        },
    },
};
