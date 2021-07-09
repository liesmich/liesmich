
export interface IMatches {
    end: number;
    host: string;
    scheme: string;
    qs?: string;
    start: number;
}
export class Converter {
    public constructor() {

    }

    public extractTemplateVariables(source: string): IMatches[] {
        const TEMPLATE_PATTERN: RegExp = /\{\{\s*([a-zA-Z]+)\:([a-zA-Z]+)(\?\S+)?\s*\}\}/g;
        const matches: IMatches[] = [];
        let execGroup: RegExpExecArray | null;
        while ((execGroup = TEMPLATE_PATTERN.exec(source)) !== null) {
            matches.push({
                end: TEMPLATE_PATTERN.lastIndex,
                host: execGroup[1],
                scheme: execGroup[2],
                qs: execGroup[3] ? execGroup[3] : undefined,
                start: execGroup.index,
            });
            console.log(`Found ${execGroup}. Next starts at ${TEMPLATE_PATTERN.lastIndex}.`);
            // expected output: "Found foo. Next starts at 9."
            // expected output: "Found foo. Next starts at 19."
        }
        return matches;
    }
    public async convert(source: string): Promise<string> {

        return '';
    }
}
