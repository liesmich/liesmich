/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MdTable, MdTableContent } from '@liesmich/parser';
import { BaseMarkdownComponent } from '../base.component';

@Component({
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'table[liesmich-md-table]',
    styleUrls: ['./markdown-table.component.scss'],
    templateUrl: './markdown-table.component.html',
})
export class MarkdownTableComponent extends BaseMarkdownComponent {

    constructor() {
        super();
    }

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('liesmich-md-table') node!: MdTable;

    // AOT safe children from the node
    get children(): MdTableContent[] { return ('children' in this.node) ? this.node.children : [] }


    public getColumnAlignment(idx: number): string {
        if (Array.isArray(this.node?.align)) {
            return this.node.align[idx] ?? '';
        }
        return '';
    }

    @HostBinding('class')
    public get jj(): string | undefined {
        return this.customClasses?.table;
    }
}
