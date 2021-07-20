/*!
 * Source https://github.com/liesmich/liesmich Package: cli
 */

import { Converter } from '@liesmich/core';
import { Command } from 'commander';
import { promises as fsp } from 'fs';
const program: Command = new Command();
program
    .command('convert')
    .argument('<source>', 'template source')
    .argument('<destination>', 'template output')
    .option('-c, --config', 'Config file to be used')
    .description('convert readme template')
    .action(async (source: string, destination: string): Promise<void> => {
        const converter: Converter = new Converter();
        const data: string = await converter.convertFile(source, 'cfg');
        console.log('data', data);
        await fsp.writeFile(destination, data);
    });
program.parse(process.argv);
