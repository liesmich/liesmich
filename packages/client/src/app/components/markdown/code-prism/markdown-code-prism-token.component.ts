/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, Input } from '@angular/core';
import { Token } from 'prismjs';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[tokenize]',
    templateUrl: './markdown-code-prism-token.component.html'
})
export class PrismTokenizerComponent {

    public tokens!: (string | Token)[];

    /** Tokenizes the input string or pass along the already tokenized array */
    @Input() set tokenize(source: (string | Token)[]) {
        this.tokens = typeof (source) === 'string' ? [source] : source;
    }

    /**
     * Helper for rendering strings
     *
     * @param token
     */
    isString(token: string | Token): boolean { return typeof (token) === 'string'; }

    /**
     * Helper for rendering tokens
     *
     * @param token
     */
    tokenClass(token: string | Token): string {
        if (typeof token === 'string') {
            return '';
        }
        // Returns the basic token class + type and appends the aliases, if any 
        return token ? ('token ' + (token.type || '') + this.tokenAliases(token)) : '';
    }

    private tokenAliases(token: Token): string {
        // Skips when no aliases
        if (!token.alias) { return ''; }
        // Appends the multiple aliases
        if (token.alias instanceof Array) {
            return token.alias.reduce((c, alias) => c + ' ' + alias, '');
        }
        // Appends the single alias
        return ' ' + token.alias;
    }
}
