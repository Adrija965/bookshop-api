// Tasks 10-13: Client-side calls to the running API using Axios.
// Make sure the server (index.js) is running BEFORE running this file.
// Run with: node tasks10-13.js

const axios = require('axios');
const BASE_URL = "https://992cfc1c-e24a-45ab-8d22-b6a36599b379-00-1zyeyofdy84d2.sisko.replit.dev/api";

// -------------------------------------------------------------
// Task 10: Get all books – Using async callback function
// -------------------------------------------------------------
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("Task 10 - All Books:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Task 10 - Error:", error.message);
  }
}

// -------------------------------------------------------------
// Task 11: Search by ISBN – Using Promises
// -------------------------------------------------------------
function getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then((response) => {
      console.log("Task 11 - Book with ISBN " + isbn + ":");
      console.log(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      console.error("Task 11 - Error:", error.message);
    });
}

// -------------------------------------------------------------
// Task 12: Search by Author – Using async/await
// -------------------------------------------------------------
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    console.log("Task 12 - Books by " + author + ":");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Task 12 - Error:", error.message);
  }
}

// -------------------------------------------------------------
// Task 13: Search by Title – Using async/await
// -------------------------------------------------------------
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`);
    console.log("Task 13 - Books with title \"" + title + "\":");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Task 13 - Error:", error.message);
  }
}

// -------------------------------------------------------------
// Run them. Comment/uncomment as needed for individual screenshots.
// -------------------------------------------------------------
getAllBooks();
getBookByISBN(1);
getBooksByAuthor("Jane Austen");
getBooksByTitle("Things Fall Apart");