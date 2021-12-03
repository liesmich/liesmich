/*
 * Package @liesmich/parser
 * Source https://liesmich.github.io/liesmich/
 */

import frontmatter, { FrontMatterResult } from 'front-matter';
import { Content as MdContent, Parent as MdParent, Root as MdRoot } from 'mdast';
import remarkGfm, { Root } from 'remark-gfm';
import remarkParse from 'remark-parse';
import SparkMD5 from 'spark-md5';
import { Processor, unified } from 'unified';

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
type PartialFrontMatter<T> = Pick<FrontMatterResult<T>, 'attributes'>;
type PartialDocument = {
    article: MdRoot;
    excerpt?: MdRoot;
    hash: string;
};

/**
 * Extracts the excerpt from the body
 *
 * @param {string} body Full body
 * @returns {string|undefined} extracted excerpt
 */
export function extractExcerpt(body: string): string | undefined {
    const parse = /(?<excerpt>.+)[\r\n]+(-{3,3})[\r\n]+/;
    const res: RegExpMatchArray | null = body.match(parse);
    return res?.groups?.excerpt;
}
/**
 * Containing Data about the parsed Document
 */
export type ParsedDocument<T> = PartialFrontMatter<T> & PartialDocument;
export type ParseOptions = { excerpt?: boolean };
/**
 * Parses the input data into an ast
 *
 * @param {string} data data to parse
 * @param {ParseOptions} opts options
 * @param {boolean} opts.excerpt if excerpt should be tried to extract
 * @returns {ParsedDocument} a parsed document
 */
export const parse = <T>(data: string, opts: ParseOptions = { excerpt: true }): ParsedDocument<T> => {
    const hash: string = SparkMD5.hash(data);
    const fm: FrontMatterResult<T> = frontmatter(data, { allowUnsafe: false });
    const processor: Processor<Root, Root, Root, void> = unified().use(remarkParse).use(remarkGfm);
    const article: MdRoot = processor.parse(fm.body);

    const excerptString: string | undefined = opts.excerpt ? extractExcerpt(fm.body) : undefined;
    const parsedExcerpt: MdRoot | undefined = excerptString ? processor.parse(excerptString) : undefined;
    return {
        article,
        attributes: fm.attributes,
        ...(parsedExcerpt ? { excerpt: parsedExcerpt } : {}),
        hash,
    };
};
