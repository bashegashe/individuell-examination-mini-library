import { findBookByTitle, searchBooks } from "./find.js";
const elements = {
    books: document.querySelector('.books__books'),
    booksSection: document.querySelector('.books'),
    book: document.querySelector('.book'),
    back: document.querySelector('.back'),
    wrapper: document.querySelector('.wrapper'),
    search: document.querySelector('.search')
};
function displayBooks(books) {
    elements.search.focus();
    for (const book of books) {
        const bookElemHTML = createBookHTML(book);
        elements.books.innerHTML += bookElemHTML;
    }
}
function displayBook(book) {
    const bookElemHTML = createBookHTML(book, true);
    const bookInfoSection = createBookInfoSection(book);
    elements.book.innerHTML = '<img src="img/back.png" alt="Go Back" class="back pointer">';
    elements.book.innerHTML += bookElemHTML;
    elements.book.innerHTML += bookInfoSection;
}
function createBookHTML(book, bigBook = false) {
    const bookElemHTML = `
        <section class="books__book ${bigBook ? 'books__book-big' : 'pointer'}" style="background:${book.color}">
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
function toggleView() {
    elements.booksSection.classList.toggle('hide');
    elements.book.classList.toggle('hide');
    if (elements.wrapper.style['max-width'] === '' || elements.wrapper.style['max-width'] === '1000px') {
        elements.wrapper.style['max-width'] = '100%';
    }
    else {
        elements.wrapper.style['max-width'] = '1000px';
    }
    elements.search.focus();
}
function filterBooks(books, query) {
    const filteredBooks = searchBooks(books, query);
    let matches = 0;
    document.querySelectorAll('.title').forEach((titleElem, i, a) => {
        let match = false;
        for (const book of filteredBooks) {
            if (book.title === titleElem.innerHTML) {
                titleElem.parentElement?.classList.remove('hide');
                match = true;
                matches++;
            }
        }
        if (!match)
            titleElem.parentElement?.classList.add('hide');
        // Visa boken direkt om bara en bok hittades för sökningen
        // if(i === a.length - 1 && matches === 1) {
        //     (document.querySelector('.books__book:not([class*="hide"])') as HTMLElement).click();
        // }
    });
}
function resetSearch(books) {
    elements.search.focus();
    elements.search.value = '';
    filterBooks(books, '');
}
function addClickListeners(books) {
    for (const bookElem of elements.books.children) {
        bookElem.addEventListener('click', () => {
            const bookTitle = bookElem.querySelector('.title').innerText;
            const book = findBookByTitle(books, bookTitle);
            if (book) {
                toggleView();
                displayBook(book);
                document.querySelector('.back').addEventListener('click', () => {
                    toggleView();
                });
            }
        });
    }
}
function addSearchListener(books) {
    document.querySelector('.search').addEventListener('input', (event) => {
        const query = event.target.value;
        filterBooks(books, query);
    });
}
function addEventListeners(books) {
    addClickListeners(books);
    addSearchListener(books);
    document.querySelector('._search i')?.addEventListener('click', () => {
        resetSearch(books);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && elements.booksSection.classList.contains('hide')) {
            toggleView();
        }
        else if (event.key === 'Escape') {
            resetSearch(books);
        }
    });
}
export { displayBooks, addEventListeners };
