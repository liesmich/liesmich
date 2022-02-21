/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { codes } from 'micromark-util-symbol/codes';
import { Code, Construct, Effects, State } from 'micromark-util-types';
import { Constants } from '../constants';
import { liesmichConstructStart } from './../tokenizer/start-construct';

export const liesmichConstructFlowStart: Construct = {
    name: 'liesmichFlowStart',
    tokenize: function liesmichTokenize(effects: Effects, ok: State, nok: State): State {
        let spaceSuffix = 0;
        const start: State = (code: Code): State | void => {
            switch (code) {
                case codes.space:
                case codes.horizontalTab:
                    if (spaceSuffix === 0) {
                        effects.enter(Constants.LIESMICH_SPACE_SUFFIX);
                    }
                    spaceSuffix++;
                    effects.consume(code);
                    return start;
                case codes.eof:
                case codes.lineFeed:
                case codes.carriageReturn:
                case codes.carriageReturnLineFeed:
                    if (spaceSuffix > 0) {
                        effects.exit(Constants.LIESMICH_SPACE_SUFFIX);
                    }
                    return ok(code);
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
