/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { codes } from 'micromark-util-symbol/codes';
import { Code, Construct, Effects, Event, State, TokenizeContext } from 'micromark-util-types';
import { Constants } from '../constants';
import { liesmichConstructScheme } from './scheme-construct';

export const liesmichConstructStart: Construct = {
    name: 'liesmichStart',
    resolveAll: function (evt: Event[], ctx: TokenizeContext): Event[] {
        //console.log(evt);
        return evt;
    },
    tokenize: function liesmichTokenize(effects: Effects, ok: State, nok: State): State {
        //console.log(this.events);
        const e: Event = this.events[this.events.length - 1];
        let newLine = false;
        if (e && e[0] === 'exit' && e[1].type === 'lineEnding') {
            newLine = true;
        }
        let openBraces = 0;
        const start: State = (code: Code): State | void => {
            if (openBraces > 2 || (openBraces === 0 && this.previous === codes.leftCurlyBrace)) {
                return nok(code);
            } else if (code !== codes.leftCurlyBrace && openBraces === 2) {
                effects.exit(Constants.LIESMICH_MARKER_START);
                return effects.attempt(liesmichConstructScheme, ok, nok);
            } else if (code === codes.leftCurlyBrace) {
                if (openBraces === 0) {
                    effects.enter(Constants.LIESMICH, { newLine });
                    effects.enter(Constants.LIESMICH_MARKER_START);
                }
                effects.consume(code);
                openBraces++;
                return start;
            }
            return nok(code);
        };

        return start;
    },
};
