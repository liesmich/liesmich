import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Token, Grammar, languages as prismLanguages } from 'prismjs';
import { Observable, of, from, EMPTY, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

/** Prism Language Modules Token */
export const LANGUAGE_MODULES = new InjectionToken<PrismLanguage[]>('wizdm.prism.language.modules');

/** List of language modules */
export type PrismLanguages = PrismLanguage[];

/** Language loader */
export interface PrismLanguage {
    name: string | string[] | '*';
    load: (name: string) => Promise<any>;
}

/** @dynamic - tells ngc to ignore the error on type PrismLanguages generated by strictEmitMetadata: true */
@Injectable()
export class PrismService {

    private tokenizer: Observable<any> = from(import('prismjs').then((p) => {
        return p.tokenize;
    })).pipe(shareReplay(1));
    constructor(@Optional() @Inject(LANGUAGE_MODULES) private languages: PrismLanguages) { }

    /** Tokenizes the input source by loading the grammar dynamically whenever necessary */
    public tokenize(source: string, language: string): Observable<(string | Token)[]> {

        // Skips invalid source
        if (!source) { return of(['']); }
        // Loads the grammar and tokenizes the source accordingly
        return combineLatest([this.loadGrammar(language), this.tokenizer]).pipe(
            map(([grammar, tokenizer]) => {
                return !!grammar ? tokenizer(source, grammar) : [source];
            })
        );
    }

    /** Loads the Grammar */
    private loadGrammar(language: string): Observable<Grammar> {

        // No language, no grammar...
        if (!language) { return EMPTY; }

        // Verifies the grammar has been already loaded
        if (prismLanguages[language]) { return of(prismLanguages[language]); }

        // Attempts to load the grammar dynamically
        const loader = this.languages && this.languages.find(({ name }) => {

            // Matches the requested language
            return Array.isArray(name) ? (name.indexOf(language) >= 0) : (name === language || name === '*');
        });

        // Abort when no loader is found
        if (!loader) { return EMPTY; }

        // Resolves the grammar by loading the module
        return from(loader.load(language)).pipe(map(() => prismLanguages[language]));
    }
}
