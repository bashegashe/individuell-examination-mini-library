import { Book } from "./interfaces";

const API_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';

async function getBooks(): Promise<Book[]> {
    const response: Response = await fetch(API_URL);
    const data: Book[] = await response.json();

    return data;
}

export { getBooks };