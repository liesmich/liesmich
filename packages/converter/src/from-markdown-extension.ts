/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { LiesmichLiteral } from '@liesmich/core';
import { Extension, Token } from 'mdast-util-from-markdown';
import { CompileContext } from 'mdast-util-from-markdown/lib';
import { parse as qsParse } from 'qs';
import { Node } from 'unist';
import { Constants } from './constants';

const getParent = (stack: CompileContext['stack']): Node => {
    return stack[stack.length - 1];
};
export const fromMarkdown: Extension = {
    enter: {
        [Constants.LIESMICH]: function (token) {
            this.enter(
                {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    type: Constants.LIESMICH as any,
                    value: this.sliceSerialize(token),
                },
                token
            );
        },
        [Constants.LIESMICH_SCHEME]: function (token) {
            const parent: LiesmichLiteral = getParent(this.stack) as LiesmichLiteral;
            if (parent.type === Constants.LIESMICH) {
                parent.scheme = this.sliceSerialize(token);
            }
        },
        [Constants.LIESMICH_STRING]: function (token: Token) {
            const parent: LiesmichLiteral = getParent(this.stack) as LiesmichLiteral;
            if (parent.type === Constants.LIESMICH) {
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
        [Constants.LIESMICH]: function exitFootnoteDefinition(token) {
            //  console.log('exit', token, this.getData('k'));
            this.exit(token);
        },
        [Constants.LIESMICH_SCHEME]: function exitFootnoteDefinition(token) {
            // console.log('exit', token, this.getData('k'));
        },
        [Constants.LIESMICH_STRING]: function exitFootnoteDefinition(token) {
            // console.log('exit', token);
        },
    },
};
