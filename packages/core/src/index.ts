/*
 * Package @liesmich/core
 * Source https://liesmich.github.io/liesmich/
 */

export { Content as MdContent, Parent as MdParent, Root as MdRoot } from 'mdast';
import { ParsedQs } from 'qs';
import { Data, Literal } from 'unist';
export * from './converter';
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

export interface ILiesmichConfig {
    out?: string;
}
export type LiesmichQueryData = ParsedQs;
export type LiesmichNodeData<Q extends LiesmichQueryData = LiesmichQueryData> = Data & {
    liesmich?: {
        host: string;
        query?: Q;
        scheme: string;
    };
};

export type LiesmichLiteral<Q extends LiesmichQueryData = LiesmichQueryData> = Literal<string, LiesmichNodeData<Q>>;
