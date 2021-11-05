#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
const program = new Command();

// $ seap-lens config --for CIF [--include CIF ...] [--single] [-to FILENAME; default=entities.json]
program
    .command('config')
    .description('Extragere ID-urilor pentru entitățile publice din SEAP')
    .option('--for <CIF>', 'CIF-ul ordonator principal de credite')
    .option('--include [CIF...]', 'CIF secundar')
    .option('--single', 'Doar CIF-ul principal')
    .option('--to <FILE>', 'Numele fisierului de output')

// $ seap-lens run --on TYPE [--from FILENAME; default=entities.json] [--to OUTPUT; default=data.json]
program
    .command('run')
    .description('Extrage informații din SEAP pentru anumite entități publice')
    .option('--on <type>', 'Tipul de raport')
    .option('--from <FILE>', 'Fisierul cu maparile pentru SEAP')
    .option('--to <FILE>', 'Numele fisierului de output')


program.parse(process.argv)