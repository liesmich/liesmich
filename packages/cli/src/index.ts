/*!
 * Source https://github.com/liesmich/liesmich Package: cli
 */

import { Converter } from '@liesmich/core';
import { Command } from 'commander';
const program: Command = new Command();
program
    .command('convert')
    .argument('<source>', 'template source')
    .argument('<destination>', 'template output')
    .option('-c, --config', 'Config file to be used')
    .description('convert readme template')
    .action(async (source, destination): Promise<void> => {
        const converter: Converter = new Converter();
        converter.convert(source);
    });
program.parse(process.argv);
