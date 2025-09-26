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
  const priceAsNumber = parseFloat(book.price.replace('€', ''));

  // Applico lo sconto e arrotonda
  const discountedPrice = (priceAsNumber * 0.80).toFixed(2);

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

//! Snack 3 - Ordinare gli Autori
// Creare un array (authors) che contiene gli autori dei libri.
const authors = books.map(book => book.author);

// Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
const areAuthorsAdults = authors.every(author => author.age >= 18);


//Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
authors.sort((a, b) => {
    if(areAuthorsAdults) {
        return a.age - b.age
    }else {
        return b.age - a.age
    }
});


//! Snack 4 - Calcola l’età media
// Creare un array (ages) che contiene le età degli autori dei libri.
const ages = authors.map(author => author.age);

// Calcola la somma delle età (agesSum) usando reduce.
const agesSum = ages.reduce((acc, n) => {
    return acc + n;
},0);

// Stampa in console l’età media degli autori dei libri.
const mean = agesSum / ages.length;
console.log(mean);

//! Snack 5 (Bonus) - Raccogli i libri
// Usando la l'API http://localhost:3333/books/{id} usa la combinazione di .map() e Promise.all(), 
// per creare una funzione (getBooks) che a partire da un array di id (ids), 
// ritorna una promise che risolve un array di libri (books).
// Testala con l’array [2, 13, 7, 21, 19] .

const getBooks = (ids) => {
    // Usa .map() per trasformare ogni ID in una Promise di fetch.
    const promises = ids.map(id => {
        const url = `http://localhost:3333/books/${id}`;
        return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
    });
    
    // Usa Promise.all() per attendere che tutte le Promise siano risolte.
    return Promise.all(promises);
};

// Array di ID fornito dall'esercizio
const bookIds = [2, 13, 7, 21, 19];

// Chiama la funzione e gestisci il risultato
getBooks(bookIds)
    .then(books => {
        console.log('Libri recuperati con successo:');
        console.log(books);
    })
    .catch(error => {
        console.error('Errore nel recupero dei libri:', error);
    });

//! Snack 6 (Bonus) - Ordina i libri
// Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
const areThereAvailableBooks = books.some(book => book.available);
console.log('Ci sono libri disponibili?', areThereAvailableBooks);

// Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
const booksByPrice = books
    .slice()
    .sort((a, b) => {
        // Rimuovo il simbolo '€' e converto la stringa in numero
        const priceA = Number(a.price.replace('€', ''));
        const priceB = Number(b.price.replace('€', ''));
        
        return priceA - priceB;
    })

console.log('Libri ordinati per prezzo:', booksByPrice);

// Ordina l’array booksByPrice in base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.
booksByPrice.sort((a, b) => {
  if (a.available && !b.available) {
    return -1; // a viene prima di b
  }
  if (!a.available && b.available) {
    return 1; // b viene prima di a
  }
  return 0; // l'ordine rimane invariato
});

console.log('Libri ordinati per disponibilità:', booksByPrice);

//! Snack 7 (Bonus) - Analizza i tag
// Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.

const tagCounts = books.reduce((acc, book) => {
  // Controllo se il libro ha una proprietà 'tags' che non sia null o undefined
  if (book.tags) {
    // Scorro l'array di tag di ogni libro
    book.tags.forEach(tag => {
      // Se il tag esiste già nell'accumulatore, incremento il conteggio
      if (acc[tag]) {
        acc[tag]++;
      } else {
        // Altrimenti, creo una nuova chiave e imposto a 1
        acc[tag] = 1;
      }
    });
  }

  // Restituisco l'accumulatore aggiornato
  return acc;
}, {}); // L'oggetto vuoto è il valore iniziale

console.log('Elenco dei tag e quante volte vengono usati:', tagCounts);
