import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

//! Caricamento dati dal file JSON
const filePath = path.join(process.cwd(), 'database', 'books.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const books = JSON.parse(rawData);

//! colori console
console.log(chalk.green('Libri caricati dal database:'), books);

