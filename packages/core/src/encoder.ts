/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import Token from 'markdown-it/lib/token';

const handleToken = (token: Token): string => {
    let data: string = encodeToken(token);
    if (token.children && token.children?.length > 0) {
        data += handleTokens(token.children);
    }
    return data;
};
const encodeToken = (token: Token): string => {
    console.log(token);
    switch (token.type) {
        case 'paragraph_open':
            return '';
        case 'inline':
            return ``;
        case 'paragraph_close':
            return `\r\n`;
        case 'blockquote_open':
            return `> `;
        case 'blockquote_close':
            return `\r\n`;
        case 'text':
            return token.content;
        case 'table_open':
            return ``;
        case 'thead_open':
            console.log(token);
            return ``;
        case 'tr_open':
            console.log(token);
            return ``;
        case 'th_open':
            console.log(token);
            return ``;
        case 'th_close':
            console.log(token);
            return `|`;
        case 'tr_close':
            return `\r\n`;
        case 'thead_close':
            return `\r\n`;
        case 'tbody_open':
            console.log(token);
            return ``;
        case 'td_open':
            return `| `;
        case 'td_close':
            return ` |`;
        case 'tbody_close':
            return `\r\n`;
        case 'table_close':
            return ``;
        case 'softbreak':
            console.log(token);
            return ``;
        case 'em_open':
            return `*`;
        case 'em_close':
            return `*`;
        case 'code_inline':
            return ``;
        case 'strong_open':
            return `**`;
        case 'strong_close':
            return `**`;
        default:
            throw new Error(`Unknown type ${token.type}`);
    }
};
export const handleTokens = (lst: Token[]): string => {
    let out: string = '';
    for (const token of lst) {
        out += handleToken(token);
    }
    return out;
};
