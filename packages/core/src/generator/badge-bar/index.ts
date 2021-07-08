import { AbstractGenerator } from "../abstract-generator";
import { BadgeGenerator, IBadgeSettings } from "../badge";
import { GeneratorHandler } from "../generator-handler";

export class BadgeBarGenerator extends AbstractGenerator<'badge-bar', IBadgeSettings[]> {
	public constructor(genHandler: GeneratorHandler) {
		super('badge-bar', genHandler);
	}

	public async generate(badges: IBadgeSettings[]): Promise<string> {
		const badgeGenerator: BadgeGenerator = this.genHandler.get('badge');
		const parts: string[] = await Promise.all(badges.map(badge => badgeGenerator.generate(badge)));
		return `<p align="center">${parts.join(this.genHandler.globalConfig.lineBreak)}</p>`;
	}
}
