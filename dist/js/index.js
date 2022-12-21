import { getBooks } from "./modules/api.js";
import { displayBooks, addEventListeners } from "./modules/ui.js";
async function main() {
    const books = await getBooks();
    displayBooks(books);
    addEventListeners(books);
}
main();
