import { CellValue } from "./table-template";

export const encodeRow = (items: CellValue[], colums: number, defaultValue?: CellValue) => {
    let out: string = '|';
    for (let i: number = 0; i < colums; i++) {
        const value: CellValue = items[i] ? items[i] : defaultValue;
        if (value) {
            if (typeof value === 'number') {
                out += ` ${value}`;
            } else if (typeof value === 'boolean') {
                out += ` ${value ? 'true' : 'false'}`;
            } else {
                out += ` ${value.split(/\r\n/).join('<br>').split(/(\r|\n)/).join('<br>')}`
            }
        }
        out += ' |';
    }
    return out;
}
