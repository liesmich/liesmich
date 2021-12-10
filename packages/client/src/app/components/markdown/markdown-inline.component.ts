/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MdHeading, MdPhrasingContent, MdTableCell } from '@liesmich/parser';
import { BaseMarkdownComponent } from './base.component';
import { MarkdownRootComponent } from './markdown-root.component';
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
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[liesmich-md-inline]',
    styleUrls: ['./markdown-inline.component.scss'],
    templateUrl: './markdown-inline.component.html',
})
export class MarkdownInlineComponent extends BaseMarkdownComponent {

    constructor(readonly tree: MarkdownTree, private root: MarkdownRootComponent) {
        super();
    }

    @Input('liesmich-md-inline') node!: MdPhrasingContent | MdTableCell | MdHeading;

    /** Rendered elements' custom classes */
    @Input() customClasses!: MarkdownInlineCustomClasses;

    // AOT safe children from the node
    get children(): any[] { return ('children' in this.node) ? this.node.children : [] }

    // Navigation helper functions
    public navigate(url: string): boolean {
        // Relies on the root parent navigation mechanism 
        this.root.navigate.emit(url);
        // Prevents default navigation towards href
        return false;
    }
}
