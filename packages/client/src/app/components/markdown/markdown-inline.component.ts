import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MdContent, MdDefinition, MdHeading, MdPhrasingContent, MdStaticPhrasingContent, MdTableCell } from '@liesmich/parser';
import { BaseMarkdownComponent } from './base.component';
import { MarkdownRoot } from './markdown-root.component';
import { MarkdownTree } from './markdown-tree.service';

/** Inline Elements' custom classes */
export interface MarkdownInlineCustomClasses {

    em?: string;
    strong?: string;
    del?: string;
    code?: string;
    sub?: string;
    sup?: string;
    span?: string;
    br?: string;
    a?: string;
    img?: string;
}

@Component({
    selector: '[liesmich-md-inline]',
    templateUrl: './markdown-inline.component.html',
    styleUrls: ['./markdown-inline.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MarkdownInline extends BaseMarkdownComponent {

    constructor(readonly tree: MarkdownTree, private root: MarkdownRoot) {
        super();
    }

    @Input('liesmich-md-inline') node!: MdPhrasingContent | MdTableCell | MdHeading;

    /** Rendered elements' custom classes */
    @Input() customClasses!: MarkdownInlineCustomClasses;

    // AOT safe children from the node
    get children(): any[] { return ("children" in this.node) ? this.node.children : [] }

    // Navigation helper functions
    public navigate(url: string): boolean {
        // Relies on the root parent navigation mechanism 
        this.root.navigate.emit(url);
        // Prevents default navigation towards href
        return false;
    }
}
