/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { constants, promises as fs } from 'fs';
import QueryString, { parse as qsParse } from 'qs';
import { AbstractGenerator } from '../generator/abstract-generator';
import { GeneratorHandler } from '../generator/generator-handler';

export interface IMatches {
    end: number;
    host: string;
    scheme: string;
    qs?: QueryString.ParsedQs;
    start: number;
}
export class Converter {
    public constructor(private readonly genHandler: GeneratorHandler) { }

    public extractTemplateVariables(source: string): IMatches[] {
        const TEMPLATE_PATTERN: RegExp = /\{\{\s*([a-zA-Z0-9_]+)\:([a-zA-Z0-9_]+)(\?\S+)?\s*\}\}/g;
        const matches: IMatches[] = [];
        let execGroup: RegExpExecArray | null;
        // tslint:disable-next-line:no-conditional-assignment
        while ((execGroup = TEMPLATE_PATTERN.exec(source)) !== null) {
            matches.push({
                end: TEMPLATE_PATTERN.lastIndex,
                host: execGroup[2],
                qs: execGroup[3] ? qsParse(execGroup[3].slice(1)) : undefined,
                scheme: execGroup[1],
                start: execGroup.index,
            });
        }
        return matches;
    }

    public async convertFile(sourceFile: string): Promise<string> {
        await fs.access(sourceFile, constants.R_OK);
        const fileContent: string = await fs.readFile(sourceFile, 'utf-8');
        return this.convert(fileContent);
    }

    private async convertInteral(source: string, depth: number): Promise<string> {
        const matches: IMatches[] = this.extractTemplateVariables(source);
        if (matches.length === 0) {
            return source;
        }
        const output: string[] = [];
        for (let i: number = 0; i < matches.length; i++) {
            const currentMatch: IMatches = matches[i];
            const sliceStart: number = i === 0 ? 0 : matches[i - 1].end;
            output.push(source.slice(sliceStart, currentMatch.start));
            const generator: AbstractGenerator<string, object> = this.genHandler.get(currentMatch.host);
            output.push(await generator.generate(currentMatch.qs as any));
        }
        output.push(source.slice(matches[matches.length - 1].end));
        const data: string = output.join('');
        return this.convertInteral(data, depth + 1);
    }

    public async convert(source: string): Promise<string> {
        return this.convertInteral(source, 0);
    }
}
