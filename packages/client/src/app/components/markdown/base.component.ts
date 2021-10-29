import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MdContent, MdHeading, MdParent } from '@liesmich/parser';
import { MarkdownInlineCustomClasses } from './markdown-inline.component';

export interface MarkdownCustomClasses extends MarkdownInlineCustomClasses {

    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;

    p?: string;

    ol?: string;
    ul?: string;
    li?: string;

    hr?: string;

    blockquote?: string;

    pre?: string;

    table?: string;
    tbody?: string;
    tr?: string;
    td?: string;
}


/** Renders a markdown text into an angular view */
@Component({
    template: '',
})
export abstract class BaseMarkdownComponent<NODE extends MdContent = MdContent> {

    /** Rendered elements' custom classes */
    @Input() customClasses!: MarkdownCustomClasses;

    public node!: NODE;
    public pos(node: MdContent): string {
        return '' + (!!node && !!node.position && node.position.start.line);
    }

    public secureString(value: string, defaultValue: string = '') { return value || defaultValue };
    @HostBinding('attr.src-line')
    public get srcLine(): string {
        return this.pos(this.node);
    }

    public parseBoolean(inp?: string | boolean | any): boolean {
        if (inp === 'true' || inp === true) {
            return true;
        } else if (typeof inp === 'number') {
            return inp !== 0;
        } else {
            return false;
        }
    }
}
