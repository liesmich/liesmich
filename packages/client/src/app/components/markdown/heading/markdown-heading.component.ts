import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MdBlockContent, MdHeading, MdPhrasingContent, MdStaticPhrasingContent, MdTable, MdTableContent, } from '@liesmich/parser';
import { MarkdownTree } from './../markdown-tree.service';
import { BaseMarkdownComponent } from '../base.component';

@Component({
    selector: '[liesmich-md-heading]',
    templateUrl: './markdown-heading.component.html',
    styleUrls: ['./markdown-heading.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MarkdownHeadingComponent extends BaseMarkdownComponent {

    constructor(readonly tree: MarkdownTree) {
        super();
    }

    @Input('data') node!: MdHeading;

    // AOT safe children from the node
    get children(): MdPhrasingContent[] { return ("children" in this.node) ? this.node.children : [] }


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
