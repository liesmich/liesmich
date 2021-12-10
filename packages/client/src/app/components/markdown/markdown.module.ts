/*
 * Package @liesmich/client
 * Source undefined
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownCodePrismComponent } from './code-prism';
import { PrismTokenizerComponent } from './code-prism/markdown-code-prism-token.component';
import { LANGUAGE_MODULES, PrismLanguages } from './code-prism/prism.service';

import { MarkdownBlockComponent } from './markdown-block.component';
import { MarkdownInlineComponent } from './markdown-inline.component';
import { MarkdownRootComponent } from './markdown-root.component';
import { MarkdownTableComponent } from './table';


/* eslint-disable @typescript-eslint/ban-ts-comment */
@NgModule({
    declarations: [
        MarkdownBlockComponent,
        MarkdownRootComponent,
        MarkdownInlineComponent,
        MarkdownTableComponent,
        MarkdownCodePrismComponent,
        PrismTokenizerComponent
    ],
    exports: [
        MarkdownBlockComponent,
        MarkdownRootComponent,
        MarkdownInlineComponent,
        MarkdownTableComponent,
        MarkdownCodePrismComponent,
        PrismTokenizerComponent
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        {
            provide: LANGUAGE_MODULES,
            // @ts-ignore
            useValue: <PrismLanguages>[{
                // @ts-ignore
                load: () => import('prismjs/components/prism-scss'),
                name: 'scss',
            },
            {
                // @ts-ignore
                load: () => import('prismjs/components/prism-typescript'),
                name: ['typescript', 'ts'],
            },
            {
                // @ts-ignore
                load: () => import('prismjs/components/prism-javascript'),
                name: ['javascript', 'js'],
            },
            {
                // @ts-ignore
                load: () => import('prismjs/components/prism-markdown'),
                name: ['markdown', 'md'],
            },
            {
                // @ts-ignore
                load: () => import('prismjs/components/prism-bash'),
                name: ['bash'],
            },
            {
                // @ts-ignore
                load: () => import('prismjs/components/prism-shell-session'),
                name: ['shell', 'sh'],
            }]
        }
    ],
})
export class MarkdownModule { }
