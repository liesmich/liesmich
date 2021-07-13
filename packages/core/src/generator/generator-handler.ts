/*!
 * Source https://github.com/liesmich/liesmich Package: core
 */

import { IConfigFile } from '../merge-config';
import { AbstractGenerator } from './abstract-generator';

type Storage<K extends string> = Map<string, AbstractGenerator<K, object>>;
// tslint:disable-next-line:callable-types interface-over-type-literal
type Newable<K extends string, T extends AbstractGenerator<K, object>> = { new(genHandler: GeneratorHandler): T; };
export class GeneratorHandler {
    private generators: Storage<string> = new Map();
    public constructor(public readonly globalConfig: IConfigFile) {

    }

    public register<K extends string, T extends AbstractGenerator<K, object>>
        (generator: Newable<K, T>): void {
        const generatorInstance: T = new generator(this);
        this.generators.set(generatorInstance.name, generatorInstance);
    }

    public get<K extends string, T extends AbstractGenerator<K, object>>(name: K): T {
        if (!this.generators.has(name)) {
            throw new Error(`Unknown generator '${name}'`);
        }
        return this.generators.get(name) as T;
    }
}
