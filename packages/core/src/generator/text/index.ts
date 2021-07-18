/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { Node } from 'unist';
import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';

export interface ITextSettings {
    value: string | null,
}
type TextNode = Node & ITextSettings & { type: 'text' };
export class TextGenerator extends AbstractGenerator<'text', ITextSettings> {
    public constructor(genHandler: GeneratorHandler) {
        super('text', genHandler);
    }

    public async generate(data: ITextSettings): Promise<TextNode> {
        return {
            type: 'text',
            value: data.value,
        };
    }
}
