/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MdCode } from '@liesmich/parser';
import { Token, TokenStream } from 'prismjs';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseMarkdownComponent } from '../base.component';
import { PrismService } from './prism.service';

@Component({
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        PrismService,
    ],
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'pre[liesmich-md-code-prism]',
    styleUrls: ['./markdown-code-prism.component.scss'],// './../../../../../node_modules/prismjs/themes/prism.css'],
    templateUrl: './markdown-code-prism.component.html',
})
export class MarkdownCodePrismComponent extends BaseMarkdownComponent {

    public tokens$!: Observable<TokenStream>;
    private sourceSubject: Subject<string>;
    constructor(private prism: PrismService) {
        super();
        this.sourceSubject = new ReplaySubject();
        this.tokens$ = this.sourceSubject
            .pipe(switchMap((source: string | Token): Observable<TokenStream> => {
                if (typeof source === 'string') {
                    return this.prism.tokenize(source, this.language || 'typescript')
                }
                return of(source);
            }))
    }

    public node!: MdCode;
    /** Applies the proper classes to the host <pre> element */
    @HostBinding('class') get clazz() {
        return `wm-prism${this.disabled ? '' : ` language-${this.language ? this.language : 'none'}`}`;
    }

    /** Disables the highlighting */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('disabled') set disableHighlight(value: boolean) { this.disabled = this.parseBoolean(value); }
    public disabled = false;

    /** Selects the language */
    public language!: string | undefined;

    /** Parses the source text */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('liesmich-md-code-prism') set source(source: MdCode) {
        this.language = source.lang || undefined;
        this.sourceSubject.next(source.value);
    }
}
