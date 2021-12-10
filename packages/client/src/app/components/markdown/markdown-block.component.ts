/*
 * Package @liesmich/client
 * Source undefined
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MdContent, MdHeading } from '@liesmich/parser';
import { BaseMarkdownComponent } from './base.component';
import { MarkdownInlineCustomClasses } from './markdown-inline.component';
import { MarkdownTree } from './markdown-tree.service';

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


@Component({
  encapsulation: ViewEncapsulation.None,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[liesmich-md-block]',
  styleUrls: ['./markdown-block.component.scss'],
  templateUrl: './markdown-block.component.html',
})
/** Renders a markdown text into an angular view */
export class MarkdownBlockComponent extends BaseMarkdownComponent {

  constructor(readonly tree: MarkdownTree) {
    super();
  }

  @Input('liesmich-md-block') node!: MdContent;

  /** Rendered elements' custom classes */
  @Input() customClasses!: MarkdownCustomClasses;

  // AOT safe children from the node
  get children(): any[] { return ('children' in this.node) ? this.node.children : [] }

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

}
