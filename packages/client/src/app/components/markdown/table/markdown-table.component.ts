import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MdTable, MdTableContent } from '@liesmich/parser';
import { BaseMarkdownComponent } from '../base.component';

@Component({
    selector: 'table[liesmich-md-table]',
    templateUrl: './markdown-table.component.html',
    styleUrls: ['./markdown-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MarkdownTable extends BaseMarkdownComponent {

    constructor() {
        super();
    }

    @Input('liesmich-md-table') node!: MdTable;

    // AOT safe children from the node
    get children(): MdTableContent[] { return ("children" in this.node) ? this.node.children : [] }


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
