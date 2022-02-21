/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { codes } from 'micromark-util-symbol/codes';
import { Extension } from 'micromark-util-types';
import { liesmichConstructFlowStart } from './flow-tokenizer/tokenizer';
import { liesmichConstructStart } from './tokenizer/start-construct';

export const liesmichExtension: Extension = {
    attentionMarkers: { null: [codes.leftCurlyBrace] },
    flow: { [codes.leftCurlyBrace]: [liesmichConstructFlowStart] },
    // flowInitial: { [codes.leftCurlyBrace]: liesmichConstructFlowStart },
    text: { [codes.leftCurlyBrace]: liesmichConstructStart },
};
