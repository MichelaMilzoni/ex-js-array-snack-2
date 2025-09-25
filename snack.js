import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

//! recuperare i libri da un'API esterna con fetch
import fetch from 'node-fetch';

//! per stampare a colori sulla console
//console.log(chalk.blue('Dati del database caricati:'), dbBooks);


//! Caricamento dati dal file JSON (per lo Snack 5)
const filePath = path.join(process.cwd(), 'database', 'books.json');
const rawData = fs.readFileSync(filePath, 'utf-8');
const dbBooks = JSON.parse(rawData); // Rinomina in dbBooks

//! Array "manuale" per gli altri snack
const books = [
  { 
	  title: "React Billionaire", 
	  pages: 250, 
	  author: {
		  name: 'Alice',
		  age: 35
	  },
	  available: false,
	  price: '101€',
	  tags: ['advanced', 'js', 'react', 'senior']
  },
  { 
	  title: "Advanced JS", 
	  pages: 500, 
	  author: {
		  name: 'Bob',
		  age: 20
	  },
	  available: true,
	  price: '25€',
	  tags: ['advanced', 'js', 'mid-senior']
  },
  { 
	  title: "CSS Secrets", 
	  pages: 320, 
	  author: {
		  name: 'Alice',
		  age: 17
	  },
	  available: true,
	  price: '8€',
	  tags: ['html', 'css', 'junior']
  },
  { 
	  title: "HTML Mastery", 
	  pages: 200, 
	  author: {
		  name: 'Charlie',
		  age: 50
	  },
	  available: false,
	  price: '48€',
	  tags: ['html', 'advanced', 'junior', 'mid-senior']
  },
];

// ---


//! Snack 1 - Filtra e Modifica
// Crea un array (longBooks) con i libri che hanno più di 300 pagine;
// Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
// Stampa in console ogni titolo nella console.

const longBooks = books.filter(book => book.pages > 300);
console.log(chalk.cyan('Libri con più di 300 pagine:'), longBooks);

const longBooksTitles = longBooks.map(book => book.title);
console.log(chalk.yellow('Titoli dei libri con più di 300 pagine:'), longBooksTitles);

longBooksTitles.forEach(title => console.log(title));

//! Snack 2 - Il primo libro scontato
// Creare un array (availableBooks) che contiene tutti i libri disponibili.
const availableBooks = books.filter(book => book.available);
console.log(chalk.cyan('Libri disponibili'), availableBooks);

// Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
const discountedBooks = availableBooks.map(book => {

    // uso replace per togliere € da ogni elemento
  const priceAsNumber = Number(book.price.replace('€', ''));

  // Applico lo sconto e arrotonda
  const discountedPrice = Math.round(priceAsNumber * 0.80 * 100) / 100;

  return {
    ...book,
    // Riconverto il numero in stringa e riaggiungi il simbolo '€'
    price: `${discountedPrice}€` 
  };
});
console.log(chalk.yellow('Libri disponibili scontati'), discountedBooks);

// Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).
const fullPricedBook = discountedBooks.find(book => {

    // uso replace per togliere € da ogni elemento
    const priceAsNumber = Number(book.price.replace('€', ''));

    // restituisco true se il prezzo non ha decimali
    return JSON.stringify(priceAsNumber % 1 === 0);

})

// Stampa in console
console.log(chalk.red('Il primo libro a prezzo intero è:', JSON.stringify(fullPricedBook, null, 1)));

