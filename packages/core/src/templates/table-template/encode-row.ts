
export const encodeRow = (items: (string | number)[], colums: number, defaultValue?: string) => {
    let out: string = '|';
    for (let i: number = 0; i < colums; i++) {
        if (items[i]) {
            out += ` ${items[i]} |`;
        } else if (defaultValue) {
            out += ` ${defaultValue} |`;
        } else {
            out += ' |';
        }
    }
    return out;
}
