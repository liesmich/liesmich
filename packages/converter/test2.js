
import { parse } from '@liesmich/parser';

// A loader to transform a partial manifest.json file into a complete
// manifest.json file by adding entries from an NPM package.json.
module.exports = function (source) {
    console.log("JAJJAJ");
    return JSON.stringify(parse(source))
};
