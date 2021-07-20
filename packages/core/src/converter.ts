/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { promises as fsp } from 'fs';
import { loadConfig, IConfig } from './config';
import { BadgeBarGenerator } from './generator/badge-bar';
import { GeneratorHandler } from './generator/generator-handler';
import { TableGenerator } from './generator/table';
import { TextGenerator } from './generator/text';
import { TemplateConverter } from './template-converter';

export class Converter {
    public async convert(data: string): Promise<string> {

        const genHandler: GeneratorHandler = new GeneratorHandler(undefined as any);
        genHandler.register(TextGenerator);
        genHandler.register(TableGenerator);
        genHandler.register(BadgeBarGenerator);
        const con: TemplateConverter = new TemplateConverter(genHandler);
        return con.convert2(data);
    }

    public async convertFile(path: string, cfgPath: string): Promise<string> {
        const dataFile: string = await fsp.readFile(path, 'utf-8');
        const cfgData: string = await fsp.readFile(cfgPath, 'utf-8');
        const cfg: IConfig = await loadConfig(cfgData);
        console.log(cfg);
        return this.convert(dataFile);
    }
}
