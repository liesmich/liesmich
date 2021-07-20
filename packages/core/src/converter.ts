import { BadgeBarGenerator } from "./generator/badge-bar";
import { GeneratorHandler } from "./generator/generator-handler";
import { TableGenerator } from "./generator/table";
import { TextGenerator } from "./generator/text";
import { TemplateConverter } from "./template-converter";

export class Converter {
    public async convert(data: string): Promise<string> {
        const genHandler: GeneratorHandler = new GeneratorHandler(undefined as any);
        genHandler.register(TextGenerator);
        genHandler.register(TableGenerator);
        genHandler.register(BadgeBarGenerator);
        const con: TemplateConverter = new TemplateConverter(genHandler);
        return con.convert2(data);
    }
}
