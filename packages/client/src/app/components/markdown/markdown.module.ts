import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Languages } from 'prismjs';
import { MarkdownCodePrismComponent } from './code-prism';
import { PrismTokenizer } from './code-prism/markdown-code-prism-token.component';
import { LANGUAGE_MODULES, PrismLanguages } from './code-prism/prism.service';

import { MarkdownBlock } from './markdown-block.component';
import { MarkdownInline } from './markdown-inline.component';
import { MarkdownRoot } from './markdown-root.component';
import { MarkdownTable } from './table';

@NgModule({
    declarations: [
        MarkdownBlock,
        MarkdownRoot,
        MarkdownInline,
        MarkdownTable,
        MarkdownCodePrismComponent,
        PrismTokenizer
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        {
            provide: LANGUAGE_MODULES,
            // @ts-ignore
            useValue: <PrismLanguages>[{
                name: 'scss',
                // @ts-ignore
                load: () => import('prismjs/components/prism-scss')
            },
            {
                name: ['typescript', 'ts'],
                // @ts-ignore
                load: () => import('prismjs/components/prism-typescript')
            },
            {
                name: ['javascript', 'js'],
                // @ts-ignore
                load: () => import('prismjs/components/prism-javascript')
            },
            {
                name: ['markdown', 'md'],
                // @ts-ignore
                load: () => import('prismjs/components/prism-markdown')
            },
            {
                name: ['bash',],
                // @ts-ignore
                load: () => import('prismjs/components/prism-bash')
            },
            {
                name: ['shell', 'sh'],
                // @ts-ignore
                load: () => import('prismjs/components/prism-shell-session')
            }
            ]
        }
    ],
    exports: [
        MarkdownBlock,
        MarkdownRoot,
        MarkdownInline,
        MarkdownTable,
        MarkdownCodePrismComponent,
        PrismTokenizer
    ],
})
export class MarkdownModule { }
