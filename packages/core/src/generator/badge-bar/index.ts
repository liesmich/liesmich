/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { AbstractGenerator } from '../abstract-generator';
import { BadgeGenerator, IBadgeSettings } from '../badge';
import { GeneratorHandler } from '../generator-handler';

export class BadgeBarGenerator extends AbstractGenerator<'badge-bar', IBadgeSettings[]> {
    public constructor(genHandler: GeneratorHandler) {
        super('badge-bar', genHandler);
    }

    public async generate(badges: IBadgeSettings[]): Promise<string> {
        const badgeGenerator: BadgeGenerator = this.genHandler.get('badge');
        const badgePromises: Promise<string>[] = badges.map((badge: IBadgeSettings): Promise<string> => badgeGenerator.generate(badge));
        const parts: string[] = await Promise.all(badgePromises);
        return `<p align="center">${parts.join(this.genHandler.globalConfig.lineBreak)}</p>`;
    }
}
