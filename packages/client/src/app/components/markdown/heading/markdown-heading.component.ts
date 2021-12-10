/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MdHeading, MdPhrasingContent } from '@liesmich/parser';
import { BaseMarkdownComponent } from '../base.component';
import { MarkdownTree } from './../markdown-tree.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[liesmich-md-heading]',
    styleUrls: ['./markdown-heading.component.scss'],
    templateUrl: './markdown-heading.component.html',
})
export class MarkdownHeadingComponent extends BaseMarkdownComponent {

    constructor(readonly tree: MarkdownTree) {
        super();
    }

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('data') node!: MdHeading;

    // AOT safe children from the node
    get children(): MdPhrasingContent[] { return ('children' in this.node) ? this.node.children : [] }


    // Table of content anchor helper
    public toc(heading: MdHeading): string {

        return this.tree.text(heading)
            // Removes any non alphanumerical characters (keeps spaces)
            .replace(/[^a-zA-Z0-9 ]/g, '')
            // Replaces spaces with '-'
            .replace(/\s+/g, '-')
            // Lowers the case
            .toLowerCase();
    }


    @HostBinding('class')
    public get jj(): string | undefined {
        return this.customClasses?.table;
    }
}
