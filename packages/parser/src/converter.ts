/*
 * Package @liesmich/parser
 * Source https://liesmich.github.io/liesmich/
 */

import frontMatter, { FrontMatterResult } from 'front-matter';
import { Content as MdContent, Parent as MdParent, Root as MdRoot } from 'mdast';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import SparkMD5 from 'spark-md5';
import { unified } from 'unified';

const clearData = (a: MdRoot | MdParent | MdContent): void => {
    if ('children' in a) {
        for (const item of a.children) {
            clearData(item);
        }
    }
    if ('position' in a) {
        delete a.position;
    }
};
export interface IAttributes {
    title?: string;
}
export {
    Heading as MdHeading,
    Reference as MdReference,
    Definition as MdDefinition,
    Footnote as MdFootnote,
    FootnoteDefinition as MdFootnoteDefinition,
    FootnoteReference as MdFootnoteReference,
    TopLevelContent as MdTopLevelContent,
    PhrasingContent as MdPhrasingContent,
    PhrasingContentMap as MdPhrasingContentMap,
    StaticPhrasingContent as MdStaticPhrasingContent,
    StaticPhrasingContentMap as MdStaticPhrasingContentMap,
    Table as MdTable,
    TableCell as MdTableCell,
    TableContent as MdTableContent,
    TableContentMap as MdTableContentMap,
    TableRow as MdTableRow,
    RowContent as MdRowContent,
    RowContentMap as MdRowContentMap,
    ThematicBreak as MdThematicBreak,
    BlockContent as MdBlockContent,
    BlockContentMap as MdBlockContentMap,
    Blockquote as MdBlockQuote,
    Code as MdCode,
    InlineCode as MdInlineCode,
} from 'mdast';
export { MdRoot, MdContent, MdParent };
export type ParsedDocument = MdRoot & { frontmatter: IAttributes; hash: string };
export const parse = (data: string): ParsedDocument => {
    const hash: string = SparkMD5.hash(data);
    const fm: FrontMatterResult<IAttributes> = frontMatter(data);
    const r: MdRoot = unified().use(remarkParse).use(remarkGfm).parse(fm.body);
    return Object.assign<MdRoot, { frontmatter: IAttributes; hash: string }>(r, { frontmatter: fm.attributes, hash });
};
