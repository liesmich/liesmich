/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, Input, Output, EventEmitter, ViewEncapsulation, HostBinding } from '@angular/core';
import { MdContent, MdFootnoteDefinition } from '@liesmich/parser';
import { MarkdownBlockComponent } from './markdown-block.component';
import { MarkdownTree } from './markdown-tree.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    providers: [MarkdownTree],
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[liesmich-md]',
    styleUrls: ['./markdown-block.component.scss'],
    templateUrl: './markdown-block.component.html',
})
/** Renders a markdown text into an angular view */
export class MarkdownRootComponent extends MarkdownBlockComponent {

    @HostBinding('class.liesmich-md')
    public readonly hostClass: boolean = true;
    constructor(readonly tree: MarkdownTree) { super(tree); }

    /** Returns the array of parsed footnotes */
    public get notes(): MdFootnoteDefinition[] { return this.tree.notes || []; }

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('liesmich-md') set parse(source: string | MdContent) {
        // Makes sure source is a valid entry
        if (!source) { source = ''; }
        // Parses the source md file into an mdAST syntax tree
        this.node = (typeof source === 'string' ? this.tree.parse(source) : source) as MdContent;
    }

    /** Disables code highlighting */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('disableHighlighting') set disablePrism(value: boolean) {
        //this.tree.disableHighlighting = coerceBooleanProperty(value);
    }

    @Output() navigate = new EventEmitter<string>();
}
