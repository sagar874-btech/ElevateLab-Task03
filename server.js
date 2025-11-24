const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Logging middleware: logs every request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ------------------------------
// In-memory array to store books
// ------------------------------
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// Helper function to generate unique sequential IDs
function generateId() {
  return books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
}

// ------------------------------
// GET /books - Return all books
// ------------------------------
app.get('/books', (req, res) => {
  res.json(books);
});

// --------------------------------------------------
// GET /books/search - Search books by title or author
// --------------------------------------------------
app.get('/books/search', (req, res) => {
  const { title, author } = req.query;
  let results = books;

  if (title) {
    results = results.filter(b =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (author) {
    results = results.filter(b =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  res.json(results);
});

// --------------------------------------------------
// POST /books - Add a new book from request body
// --------------------------------------------------
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  // Check if book with same title and author exists
  const exists = books.some(b => b.title === title && b.author === author);
  if (exists) {
    return res.status(409).json({ message: "Book already exists" });
  }

  const newBook = {
    id: generateId(),
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// --------------------------------------------------
// PUT /books/:id - Update book details by ID
// --------------------------------------------------
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Duplicate validation on update
  if (title && author) {
    const conflict = books.some(
      b => b.id !== bookId && b.title === title && b.author === author
    );

    if (conflict) {
      return res.status(409).json({
        message: "Another book with same title and author already exists"
      });
    }
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// -------------------------------------------
// DELETE /books/:id - Remove a book by ID
// -------------------------------------------
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);

  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);

  res.json({ message: "Book deleted", deletedBook: deletedBook[0] });
});

// --------------------------------------------------
// Error handling middleware
// --------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
