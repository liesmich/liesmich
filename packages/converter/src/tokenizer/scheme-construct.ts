import { codes } from "micromark-util-symbol/codes";
import { Code, Construct, Effects, State } from "micromark-util-types";
import { Constants } from "../constants";
import { liesmichConstructInside } from "./inside-construct";

export const liesmichConstructScheme: Construct = {
    name: 'liesmichScheme',
    tokenize: function (effects: Effects, ok: State, nok: State): State {
        let schemeCounter = 0;
        const scheme: State = (code: Code): State | void => {
            if (code === codes.space || code === codes.horizontalTab) {
                effects.consume(code);
                return scheme;
            }
            if (schemeCounter === 0 && (code === codes.lowercaseL || code === codes.uppercaseL)) {
                effects.enter(Constants.LIESMICH_SCHEME);
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
                effects.exit(Constants.LIESMICH_SCHEME);
                effects.consume(code);
                effects.enter(Constants.LIESMICH_STRING);
                schemeCounter++;
                return effects.attempt(liesmichConstructInside, ok, nok);
            }
            return nok(code);
        };
        return scheme;
    }
};
