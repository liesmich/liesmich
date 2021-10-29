import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MdContent, MdFootnoteDefinition } from '@liesmich/parser';
import { MarkdownBlock } from './markdown-block.component';
import { MarkdownTree } from './markdown-tree.service';

@Component({
    selector: '[liesmich-md]',
    templateUrl: './markdown-block.component.html',
    styleUrls: ['./markdown-block.component.scss'],
    providers: [MarkdownTree],
    encapsulation: ViewEncapsulation.None,
    host: { 'class': 'liesmich-md' }
})
/** Renders a markdown text into an angular view */
export class MarkdownRoot extends MarkdownBlock {

    constructor(readonly tree: MarkdownTree) { super(tree); }

    /** Returns the array of parsed footnotes */
    public get notes(): MdFootnoteDefinition[] { return this.tree.notes || []; }

    @Input('liesmich-md') set parse(source: string | MdContent) {
        // Makes sure source is a valid entry
        if (!source) { source = ''; }
        // Parses the source md file into an mdAST syntax tree
        this.node = (typeof source === 'string' ? this.tree.parse(source) : source) as any;
    }

    /** Disables code highlighting */
    @Input('disableHighlighting') set disablePrism(value: boolean) {
        //this.tree.disableHighlighting = coerceBooleanProperty(value);
    }

    @Output('navigate') navigate = new EventEmitter<string>();
}
