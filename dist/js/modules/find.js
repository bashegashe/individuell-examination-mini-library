/**
 * Funktioner för att söka/hitta böcker
 */
function findBookByTitle(books, title) {
    title = title.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    for (const book of books) {
        const bookTitle = book.title.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
        if (bookTitle === title) {
            return book;
        }
    }
    return null;
}
function searchBooks(books, query) {
    if (query === '')
        return books;
    query = query.toLowerCase();
    const filteredBooks = books.filter((book) => {
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
