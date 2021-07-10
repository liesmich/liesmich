/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

export const rowReduce: Parameters<string[]['reduce']>[0] = (prev: string,
    current: string,
    idx: number,
    source: string[]): string => {
    return `${idx === 0 ? '|' : ''} ${current} |`;
};
