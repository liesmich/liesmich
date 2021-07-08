import { GeneratorHandler } from "./generator-handler";

export abstract class AbstractGenerator<T extends string, K extends object> {
    public constructor(public readonly name: T,
        protected readonly genHandler: GeneratorHandler) {

    }

    public abstract generate(cfg: K): Promise<string>;
}
