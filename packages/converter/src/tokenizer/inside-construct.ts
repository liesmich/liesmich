import { codes } from "micromark-util-symbol/codes";
import { Code, Construct, Effects, State } from "micromark-util-types";
import { Constants } from "../constants";
import { liesmichConstructEnd } from './end-construct';

export const liesmichConstructInside: Construct = {
    name: 'liesmichInside',
    tokenize: function (effects: Effects, ok: State, nok: State): State {
        const inside = (code: Code): State | void => {
            if (code === codes.carriageReturn || code === codes.lineFeed || code === codes.carriageReturnLineFeed || code === null) {
                return nok(code);
            }
            if (code === codes.rightCurlyBrace || code === codes.space || code === codes.horizontalTab) {
                effects.exit(Constants.LIESMICH_STRING);
                return effects.attempt(liesmichConstructEnd, ok, nok);
            }

            effects.consume(code);
            return inside;
        };
        return inside;
    }
};
