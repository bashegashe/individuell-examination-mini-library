const elements = {
    books: document.querySelector('.books__books'),
    booksSection: document.querySelector('.books'),
    book: document.querySelector('.book'),
};
function createBookHTML(book, bigBook = false) {
    const bookElemHTML = `
        <section class="books__book ${bigBook ? 'books__book-big' : ''} pointer" style="background:${book.color}">
            <article class="bg"></article>
            <article class="line"></article>
            <h2 class="title">${book.title}</h2>
            <h3 class="author">${book.author}</h3>
        </section>`;
    return bookElemHTML;
}
function createBookInfoSection(book) {
    const bookInfoSection = `
        <section class="book__info">
            <h2>${book.title}</h2>
            <h3>by ${book.author}</h3>
            <p>${book.plot}</p>
            <article class="book__info__details__holder">
                <article class="book__info__details">
                    <b><span>Audience </span></b> <span>${book.audience}</span>
                    <b><span>First published </span></b> <span>${book.year}</span>
                    <b><span>Pages </span></b> <span>${book.pages}</span>
                    <b><span>Publisher </span></b> <span>${book.publisher}</span>
                </article>
            </article>
            <button class="book__info__button pointer">Oh, I want to read it!</button>
        </section>
    `;
    return bookInfoSection;
}
function displayBooks(books) {
    for (const book of books) {
        const bookElemHTML = createBookHTML(book);
        elements.books.innerHTML += bookElemHTML;
    }
}
function displayBook(book) {
    const bookElemHTML = createBookHTML(book, true);
    const bookInfoSection = createBookInfoSection(book);
    elements.book.innerHTML = bookElemHTML;
    elements.book.innerHTML += bookInfoSection;
}
function findBookByTitle(books, title) {
    title = title.replace(/[^A-Za-z0-9]/g, '');
    for (const book of books) {
        if (book.title.replace(/[^A-Za-z0-9]/g, '') === title) {
            return book;
        }
    }
    return null;
}
function addClickListeners(books) {
    for (const bookElem of elements.books.children) {
        bookElem.addEventListener('click', () => {
            const bookTitle = bookElem.querySelector('.title').innerText;
            const book = findBookByTitle(books, bookTitle);
            if (book) {
                elements.booksSection.classList.toggle('hide');
                elements.book.classList.toggle('hide');
                displayBook(book);
            }
        });
    }
}
export { displayBooks, addClickListeners };
