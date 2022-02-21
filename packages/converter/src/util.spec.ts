/*
 * Package @liesmich/converter
 * Source https://liesmich.github.io/liesmich/
 */

export const escapeLineBreaks = (line: string): string => {
    return line.replace(/[\r\n]/g, (a, b, c, d) => {
        return a === '\r' ? '\\r' : '\\n';
    });
};
