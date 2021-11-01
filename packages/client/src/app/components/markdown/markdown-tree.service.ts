import { Injectable } from "@angular/core";
import {
    MdContent,
    MdDefinition,
    MdFootnoteDefinition,
    MdFootnoteReference,
    MdParent,
    MdReference,
    MdRoot,
    MdTopLevelContent,
    parse,
    ParsedDocument
} from "@liesmich/parser";
import { environment } from "src/environments/environment";

@Injectable()
export class MarkdownTree {

    public root!: MdRoot;
    public defs!: MdDefinition[];
    public notes!: MdFootnoteDefinition[];

    /** Top level nodes (root's children) */
    public get tops(): MdTopLevelContent[] { return (!!this.root && this.root.children || []) as any[]; }

    /** Parses the markdown source into an mdContent tree */
    public parse(source: string): MdRoot {
        // Parses the source into the mdContent tree
        this.root = parse(source).article;//!!source ? parse(source) : [];
        // Extracts the definitions (links and images)
        this.defs = this.tops.filter(node => node.type === 'definition') as MdDefinition[];
        // Extracts the footnote definitions
        this.notes = this.tops.filter(node => node.type === 'footnoteDefinition') as MdFootnoteDefinition[];
        // Returns the root node
        return this.root;
    }

    /** Seeks for the definition's node of the matching reference  */
    public definition(ref: MdReference): MdDefinition | any {
        // Seeks the referred definition node
        return this.defs.find(def => def.identifier === ref.identifier)!;
    }

    /** Seeks for the footnode definition's node of the matching reference */
    public footnote(ref: MdFootnoteReference): MdFootnoteDefinition {
        // Seeks the referred definition node
        return this.notes.find(def => def.identifier === ref.identifier)!;
    }

    /** Seeks for the footnote definition index of the matching reference */
    public footnoteIndex(ref: MdFootnoteDefinition): number {
        return 1 + this.notes.findIndex(def => def.identifier === ref.identifier);
    }

    /** Parses the tree branch returning a plain concatenated text */
    public text(node: MdContent): string {

        return ("children" in node) ? (node as MdParent).children.reduce((txt: string, child: MdContent) => {

            return txt + (child.type === 'text' ? child.value : '') + this.text(child);

        }, '') : '';
    }
}
