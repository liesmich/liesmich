import { codes } from "micromark-util-symbol/codes";
import { Code, Construct, Effects, State } from "micromark-util-types";
import { Constants } from "../constants";

export const liesmichConstructEnd: Construct = {
    name: 'liesmichEnd',
    tokenize: function (effects: Effects, ok: State, nok: State): State {
        let closeBraces: number = 0;

        const end: State = (code: Code): State | void => {
            if (closeBraces === 0) {
                if (code === codes.space || code === codes.horizontalTab) {
                    effects.consume(code);
                    return end;
                } else {
                    effects.enter(Constants.LIESMICH_MARKER_END);
                }
            }
            if (code !== codes.rightCurlyBrace) {
                if (closeBraces === 2) {
                    effects.exit(Constants.LIESMICH_MARKER_END);
                    effects.exit(Constants.LIESMICH);
                    return ok;
                } else {
                    return nok;
                }
            }
            effects.consume(code);
            closeBraces++;
            return end;
        };
        return end;
    },

};
