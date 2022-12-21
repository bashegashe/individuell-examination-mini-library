import { Book } from "./modules/interfaces";
import { getBooks } from "./modules/api.js";
import { displayBooks, addEventListeners } from "./modules/ui.js";

async function main() {
    const books: Book[] = await getBooks();

    displayBooks(books);

    addEventListeners(books);
}

main();