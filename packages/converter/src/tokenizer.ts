/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

import { codes } from 'micromark-util-symbol/codes';
import { Code, Construct, Effects, Extension, State, Tokenizer } from 'micromark-util-types';

const liesmichTokenizeOpen: Tokenizer = function liesmichTokenize(effects: Effects, ok: State, nok: State): State {
    let openBraces = 0;
    let closeBraces = 0;
    let schemeCounter = 0;
    const start: State = (code: Code): State | void => {
        if (openBraces > 2 || (openBraces === 0 && this.previous === codes.leftCurlyBrace)) {
            return nok(code);
        } else if (code !== codes.leftCurlyBrace && openBraces === 2) {
            effects.exit('liesmichMarker');
            return scheme(code);
        } else if (code === codes.leftCurlyBrace) {
            if (openBraces === 0) {
                effects.enter('liesmich');
                effects.enter('liesmichMarker');
            }
            effects.consume(code);
            openBraces++;
            return start;
        }
        return nok(code);
    };

    const scheme: State = (code: Code): State | void => {
        if (code === codes.space || code === codes.horizontalTab) {
            effects.consume(code);
            return scheme;
        }
        if (schemeCounter === 0 && (code === codes.lowercaseL || code === codes.uppercaseL)) {
            effects.enter('liesmichScheme');
            effects.consume(code);
            schemeCounter++;
            return scheme;
        }
        if (schemeCounter === 1 && (code === codes.lowercaseM || code === codes.uppercaseM)) {
            effects.consume(code);
            schemeCounter++;
            return scheme;
        }
        if (schemeCounter === 2 && code === codes.colon) {
            effects.exit('liesmichScheme');
            effects.consume(code);
            effects.enter('liesmichString');
            schemeCounter++;
            return inside;
        }
        return nok(code);
    };

    const end: State = (code: Code): State | void => {
        if (closeBraces === 0) {
            if (code === codes.space || code === codes.horizontalTab) {
                effects.consume(code);
                return end;
            } else {
                effects.enter('liesmichMarker');
            }
        }
        if (code !== codes.rightCurlyBrace) {
            if (closeBraces === 2) {
                effects.exit('liesmichMarker');
                effects.exit('liesmich');
                return ok(code);
            } else {
                return nok(code);
            }
        }
        effects.consume(code);
        closeBraces++;
        return end;
    };

    const inside = (code: Code): State | void => {
        if (code === codes.carriageReturn || code === codes.lineFeed || code === codes.carriageReturnLineFeed || code === null) {
            return nok(code);
        }
        if (code === codes.rightCurlyBrace || code === codes.space || code === codes.horizontalTab) {
            effects.exit('liesmichString');
            return end(code);
        }

        effects.consume(code);
        return inside;
    };
    return start;
};

const liesmichConstruct: Construct = {
    name: 'liesmich',
    tokenize: liesmichTokenizeOpen,
};

export const liesmichExtension: Extension = {
    attentionMarkers: { null: [codes.leftCurlyBrace] },
    insideSpan: { null: [liesmichConstruct] },
    text: { [codes.leftCurlyBrace]: liesmichConstruct },
};
