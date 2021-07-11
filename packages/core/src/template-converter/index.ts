/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { AbstractGenerator } from "../generator/abstract-generator";
import { GeneratorHandler } from "../generator/generator-handler";

export interface IMatches {
    end: number;
    host: string;
    scheme: string;
    qs?: string;
    start: number;
}
export class Converter {
    public constructor(private readonly genHandler: GeneratorHandler) {

    }

    public extractTemplateVariables(source: string): IMatches[] {
        const TEMPLATE_PATTERN: RegExp = /\{\{\s*([a-zA-Z]+)\:([a-zA-Z]+)(\?\S+)?\s*\}\}/g;
        const matches: IMatches[] = [];
        let execGroup: RegExpExecArray | null;
        // tslint:disable-next-line:no-conditional-assignment
        while ((execGroup = TEMPLATE_PATTERN.exec(source)) !== null) {
            matches.push({
                end: TEMPLATE_PATTERN.lastIndex,
                host: execGroup[2],
                qs: execGroup[3] ? execGroup[3] : undefined,
                scheme: execGroup[1],
                start: execGroup.index,
            });
        }
        return matches;
    }
    public async convert(source: string): Promise<string> {
        const matches: IMatches[] = this.extractTemplateVariables(source);
        if (matches.length === 0) {
            return source;
        }
        let output: string[] = [];
        for (let i: number = 0; i < matches.length; i++) {
            const currentMatch: IMatches = matches[i];
            const sliceStart: number = i === 0 ? 0 : matches[i - 1].end;
            output.push(source.slice(sliceStart, currentMatch.start));
            const generator: AbstractGenerator<string, object> = this.genHandler.get(currentMatch.host);
            output.push(await generator.generate(currentMatch.qs as any));
        }
        output.push(source.slice(matches[matches.length - 1].end));
        return output.join('');
    }
}
