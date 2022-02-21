/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { codes } from 'micromark-util-symbol/codes';
import { Code, Construct, Effects, State } from 'micromark-util-types';
import { liesmichConstructStart } from './../tokenizer/start-construct';

export const liesmichConstructFlowStart: Construct = {
    name: 'liesmichFlowStart',
    tokenize: function liesmichTokenize(effects: Effects, ok: State, nok: State): State {
        const start: State = (code: Code): State | void => {
            switch (code) {
                case codes.space:
                case codes.horizontalTab:
                    effects.consume(code);
                    return start;
                case codes.eof:
                    return ok(code);
                case codes.lineFeed:
                case codes.carriageReturn:
                case codes.carriageReturnLineFeed:
                    effects.enter('lineEnding');
                    effects.consume(code);
                    effects.exit('lineEnding');
                    return ok;
                default:
                    return nok;
            }
        };
        return effects.attempt(
            liesmichConstructStart,
            (code: Code): void | State => {
                return start(code);
            },
            nok
        );
    },
};
