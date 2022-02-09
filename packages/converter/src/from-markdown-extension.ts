/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral } from '@liesmich/core';
import { Extension, Token } from 'mdast-util-from-markdown';
import { CompileContext } from 'mdast-util-from-markdown/lib';
import { parse as qsParse } from 'qs';
import { Node } from 'unist';

const getParent = (stack: CompileContext['stack']): Node => {
    return stack[stack.length - 1];
};
export const fromMarkdown: Extension = {
    enter: {
        liesmich: function (token) {
            this.enter(
                {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    type: 'liesmich' as any,
                    value: this.sliceSerialize(token),
                },
                token
            );
        },
        liesmichScheme: function (token) {
            const parent: LiesmichLiteral = getParent(this.stack) as LiesmichLiteral;
            if (parent.type === 'liesmich') {
                parent.scheme = this.sliceSerialize(token);
            }
        },
        liesmichString: function (token: Token) {
            const parent: LiesmichLiteral = getParent(this.stack) as LiesmichLiteral;
            if (parent.type === 'liesmich') {
                const serialized: string = this.sliceSerialize(token);
                const queryIndex: number = serialized.indexOf('?');
                if (queryIndex >= 0) {
                    parent.query = qsParse(serialized.substring(queryIndex + 1));
                    parent.host = serialized.substring(0, queryIndex);
                } else {
                    parent.host = serialized;
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
