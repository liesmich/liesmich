/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { Node } from 'unist';
import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';

export interface IImageSettings {
    // tslint:disable-next-line:no-null-keyword
    alt: string | null;
    // tslint:disable-next-line:no-null-keyword
    title: string | null;
    url: string;
}
type ImageNode = Node & IImageSettings & { type: 'image' };
export class ImageGenerator extends AbstractGenerator<'image', IImageSettings> {
    public constructor(genHandler: GeneratorHandler) {
        super('image', genHandler);
    }

    public async generate(image: IImageSettings): Promise<ImageNode> {
        return {
            // tslint:disable-next-line:no-null-keyword
            alt: image.alt || null,
            // tslint:disable-next-line:no-null-keyword
            title: image.title || null,
            type: 'image',
            url: image.url,
        };
    }
}
