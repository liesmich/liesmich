import { readFile } from "fs/promises";
import { GeneratorHandler } from "./generator/generator-handler";
import { TableGenerator } from "./generator/table";
import { TextGenerator } from "./generator/text";
import { TemplateConverter } from "./template-converter";

export class Converter {
    public static async convert(path: string, cfg: string): Promise<string> {
        const genHandler: GeneratorHandler = new GeneratorHandler(undefined as any);
        genHandler.register(TextGenerator);
        genHandler.register(TableGenerator);
        const con: TemplateConverter = new TemplateConverter(genHandler);
        return con.convert2(await readFile(path, 'utf-8'));
    }
}
