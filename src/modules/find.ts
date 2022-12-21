/** 
 * Funktioner för att söka/hitta böcker
 */

import { Book } from "./interfaces";

function findBookByTitle(books: Book[], title: string): Book | null {
    title = title.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

    for (const book of books) {
        const bookTitle = book.title.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

        if (bookTitle === title) {
            return book;
        }
    }

    return null;
}

function searchBooks(books: Book[], query: string): Book[] {
    if(query === '') return books;
    
    query = query.toLowerCase();

    const filteredBooks: Book[] = books.filter((book: Book) => {      
        // Söker igenom alla egenskaper i boken som titel, författare, handling för att se om något matchar
        for (const value of Object.values(book)) {
            if (value?.toString().toLowerCase().includes(query)) {
                return true;
            }
        }

        return false;
    });

    return filteredBooks;
}

export { findBookByTitle, searchBooks };