/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';

export interface IImageSettings {
	alt: string;
	title?: string;
	src: string;
}
export class ImageGenerator extends AbstractGenerator<'image', IImageSettings> {
	public constructor(genHandler: GeneratorHandler) {
		super('image', genHandler);
	}

	public async generate(image: IImageSettings): Promise<string> {
		return `![${encodeURIComponent(image.alt)}](${image.src}${image.title ? ` "${encodeURIComponent(image.title)}"` : ''})`;
	}
}
