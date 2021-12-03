import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MdBlockContent, MdCode, MdHeading, MdPhrasingContent, MdStaticPhrasingContent, MdTable, MdTableContent, } from '@liesmich/parser';
import { MarkdownTree } from '../markdown-tree.service';
import { BaseMarkdownComponent } from '../base.component';
import { PrismService } from './prism.service';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Token, TokenStream } from 'prismjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'pre[liesmich-md-code-prism]',
    templateUrl: './markdown-code-prism.component.html',
    styleUrls: ['./markdown-code-prism.component.scss'],// './../../../../../node_modules/prismjs/themes/prism.css'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [
        PrismService,
    ]
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
    @Input('disabled') set disableHighlight(value: boolean) { this.disabled = this.parseBoolean(value); }
    public disabled = false;

    /** Selects the language */
    public language!: string | undefined;

    /** Parses the source text */
    @Input('liesmich-md-code-prism') set source(source: MdCode) {
        this.language = source.lang || undefined;
        this.sourceSubject.next(source.value);
    }
}
