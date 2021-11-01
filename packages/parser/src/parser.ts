/*
 * Package @liesmich/parser
 * Source https://liesmich.github.io/liesmich/
 */

import matter, { GrayMatterFile } from 'gray-matter';
import { Content as MdContent, Parent as MdParent, Root as MdRoot } from 'mdast';
import remarkGfm, { Root } from 'remark-gfm';
import remarkParse from 'remark-parse';
import SparkMD5 from 'spark-md5';
import { Processor, unified } from 'unified';

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
type PartialFrontMatter = Pick<GrayMatterFile<string>, 'data' | 'language'>;
type PartialDocument = {
    article: MdRoot;
    excerpt?: MdRoot;
    hash: string;
};
/**
 * Containing Data about the parsed Document
 */
export type ParsedDocument = PartialFrontMatter & PartialDocument;
/**
 * Parses the input data into an ast
 *
 * @param data data to parse
 * @param opts options
 * @param opts.excerpt if excerpt should be tried to extract
 * @returns a parsed document
 */
export const parse = (data: string, opts: { excerpt?: boolean } = { excerpt: true }): ParsedDocument => {
    const hash: string = SparkMD5.hash(data);
    const fm: GrayMatterFile<string> = matter(data, { excerpt: opts?.excerpt || true });
    const processor: Processor<Root, Root, Root, void> = unified().use(remarkParse).use(remarkGfm);
    const article: MdRoot = processor.parse(fm.content);
    const parsedExcerpt: MdRoot | undefined = fm.excerpt ? processor.parse(fm.excerpt) : undefined;
    return {
        article,
        data: fm.data,
        ...(parsedExcerpt ? { excerpt: parsedExcerpt } : {}),
        hash,
        language: fm.language,
    };
};
