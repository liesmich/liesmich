/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { MarkedOptions, Renderer } from 'marked';

export class MarkdownRenderer extends Renderer {

    public constructor(options?: MarkedOptions) {
        super(options);
    }

    public checkbox(checked: boolean): string {
        return `[${checked ? 'x' : ''}]`;
    }
    public blockquote(quote: string): string {
        return `> ${quote}`;
    }

    public list(body: string, ordered: boolean, start: number): string {
        if (ordered) {
            return `${start}. ${body}`;
        }
        return `- ${body}`;
    }

    public listitem(text: string, task?: boolean, checked?: boolean): string {
        console.log('listitem', arguments);
        return `${text}\r\n`;
    }

    public paragraph(paragraph: string): string {
        return `${paragraph}\r\n`;
    }

    public text(text: string): string {
        return text;
    }
}
