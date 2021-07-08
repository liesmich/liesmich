import { promises as fsp } from 'fs';
import { Lexer, Token, TokensList, walkTokens } from 'marked';


const parseText = (tree: Token[]) => {
    tree.forEach((item: Token) => {
        if ('type' in item) {
            switch (item.type) {
                case 'text':
                    item.text = 'no';
                    break;
            }
        }
        if ('tokens' in item) {
            parseText(item.tokens as any);
        }
    });
}
export const parseConfigFile = async (filepath): Promise<TokensList> => {
    const lexer: Lexer = new Lexer({});
    const fileContent: string = await fsp.readFile(filepath, 'utf-8');
    const tree: TokensList = lexer.lex(fileContent);
    parseText(tree);

    walkTokens(tree, (t: Token): void => {
        console.log(t);
        if ('type' in t) {
            switch (t.type) {
                case 'text':
                    t.text = 'no';
                    break;
            }
        }
    })
    return tree;
}

export const parseConfig = (markdown: string): TokensList => {
    const lexer: Lexer = new Lexer({});
    const tree: TokensList = lexer.lex(markdown);
    parseText(tree);

    return tree;
}
