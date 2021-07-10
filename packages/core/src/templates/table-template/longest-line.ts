/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

export const calculateLongestLine: (data: string) => number = (data: string): number => {
    return data.split(/[\r\n]+/)
        .reduce((prev: number, cur: string): number => {
            return Math.max(prev, cur.length);
        }, 0);
};
