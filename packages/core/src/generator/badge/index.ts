/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';

export interface IBadgeSettings {
	url: string;
	alt: string;
	img: string;
}
export class BadgeGenerator extends AbstractGenerator<'badge', IBadgeSettings> {
	public constructor(genHandler: GeneratorHandler) {
		super('badge', genHandler);
	}

	public async generate(badge: IBadgeSettings): Promise<string> {
		return `<a href="${badge.url}"><img alt="${badge.alt}" src="${badge.img}" height="20"/></a>`;
	}
}
