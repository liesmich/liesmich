export const rowReduce: Parameters<Array<string>['reduce']>[0] = (prev: string,
    current: string,
    idx: number,
    source: string[]): string => {
    return `${idx === 0 ? '|' : ''} ${current} |`;
}
