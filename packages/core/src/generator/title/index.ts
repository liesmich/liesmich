import { AbstractGenerator } from '../abstract-generator';
import { GeneratorHandler } from '../generator-handler';

export interface ITitleSettings {
	importance?: number;
	title: string;
}
export class TitleGenerator extends AbstractGenerator<'title', ITitleSettings> {
	public constructor(genHandler: GeneratorHandler) {
		super('title', genHandler);
	}

	public async generate(badge: ITitleSettings): Promise<string> {
		const prefix: number = badge.importance ? Math.max(Math.round(badge.importance), 1) : 1;
		return `${'#'.repeat(prefix)} ${badge.title}${this.genHandler.globalConfig.lineBreak}`;
	}
}
